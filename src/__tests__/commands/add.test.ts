import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs-extra';
import prompts from 'prompts';
import { execSync } from 'child_process';
import add from '../../commands/add';

// Mock dependencies
const { mockFs, mockExecSync } = vi.hoisted(() => ({
  mockFs: {
    existsSync: vi.fn(),
    ensureDirSync: vi.fn(),
    copyFileSync: vi.fn(),
    readFileSync: vi.fn(),
  },
  mockExecSync: vi.fn(),
}));

vi.mock('fs-extra', () => ({
  default: mockFs,
  ...mockFs,
}));

vi.mock('prompts');

vi.mock('child_process', () => ({
  execSync: mockExecSync,
  default: {
    execSync: mockExecSync,
  },
}));
vi.mock('chalk', () => ({
  default: {
    red: (s: string) => s,
    green: (s: string) => s,
    yellow: (s: string) => s,
    blue: (s: string) => s,
    cyan: (s: string) => s,
  },
}));

describe('add command', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should log an error if the component template does not exist', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    (fs.existsSync as any).mockReturnValue(false);

    await add('non-existent');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Component "non-existent" not found'),
    );
    consoleSpy.mockRestore();
  });

  it('should copy the component template if it exists and no dependencies are required', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Mock template exists
    (fs.existsSync as any).mockImplementation((p: string) => {
      if (p.includes('templates')) return true;
      if (p.includes('src/components/ui')) return false;
      return false;
    });

    await add('loader'); // loader has no dependencies in add.ts

    expect(fs.ensureDirSync).toHaveBeenCalledWith('src/components/ui');
    expect(fs.copyFileSync).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Loader component added!'),
    );
    consoleSpy.mockRestore();
  });

  it('should install dependencies and copy the template when missing dependencies are accepted', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Mock template exists
    (fs.existsSync as any).mockImplementation((p: string) => {
      if (p.includes('templates')) return true;
      if (p.includes('package.json')) return true;
      return false;
    });

    // Mock package.json content (empty dependencies)
    (fs.readFileSync as any).mockReturnValue(
      JSON.stringify({ dependencies: {} }),
    );

    // Mock user accepts installation
    (prompts as any).mockResolvedValue({ install: true });

    await add('dialog'); // dialog requires @radix-ui/react-slot

    expect(execSync).toHaveBeenCalledWith(
      expect.stringContaining('npm install @radix-ui/react-slot'),
      expect.any(Object),
    );
    expect(fs.copyFileSync).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Dialog component added!'),
    );
    consoleSpy.mockRestore();
  });

  it('should abort if user rejects dependency installation', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    (fs.existsSync as any).mockImplementation((p: string) => {
      if (p.includes('templates')) return true;
      if (p.includes('package.json')) return true;
      return false;
    });
    (fs.readFileSync as any).mockReturnValue(
      JSON.stringify({ dependencies: {} }),
    );
    (prompts as any).mockResolvedValue({ install: false });

    await add('dialog');

    expect(execSync).not.toHaveBeenCalled();
    expect(fs.copyFileSync).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Aborted.'),
    );
    consoleSpy.mockRestore();
  });

  it('should prompt for overwrite if target file exists', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    (fs.existsSync as any).mockImplementation((p: string) => {
      if (p.includes('templates')) return true;
      if (p.includes('src/components/ui')) return true; // Target exists
      return false;
    });

    (prompts as any).mockResolvedValue({ overwrite: true });

    await add('loader');

    expect(prompts).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining(
          'already exists. Do you want to overwrite it?',
        ),
      }),
    );
    expect(fs.copyFileSync).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should abort if target file exists and user rejects overwrite', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    (fs.existsSync as any).mockImplementation((p: string) => {
      if (p.includes('templates')) return true;
      if (p.includes('src/components/ui')) return true;
      return false;
    });

    (prompts as any).mockResolvedValue({ overwrite: false });

    await add('loader');

    expect(fs.copyFileSync).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Aborted.'),
    );
    consoleSpy.mockRestore();
  });

  it('should detect pnpm package manager if pnpm-lock.yaml exists', async () => {
    (fs.existsSync as any).mockImplementation((p: string) => {
      if (p.includes('templates')) return true;
      if (p.includes('pnpm-lock.yaml')) return true;
      if (p.includes('package.json')) return true;
      return false;
    });
    (fs.readFileSync as any).mockReturnValue(
      JSON.stringify({ dependencies: {} }),
    );
    (prompts as any).mockResolvedValue({ install: true });

    await add('dialog');

    expect(execSync).toHaveBeenCalledWith(
      expect.stringContaining('pnpm add'),
      expect.any(Object),
    );
  });

  it('should detect yarn package manager if yarn.lock exists', async () => {
    (fs.existsSync as any).mockImplementation((p: string) => {
      if (p.includes('templates')) return true;
      if (p.includes('yarn.lock')) return true;
      if (p.includes('package.json')) return true;
      return false;
    });
    (fs.readFileSync as any).mockReturnValue(
      JSON.stringify({ dependencies: {} }),
    );
    (prompts as any).mockResolvedValue({ install: true });

    await add('dialog');

    expect(execSync).toHaveBeenCalledWith(
      expect.stringContaining('yarn add'),
      expect.any(Object),
    );
  });
});
