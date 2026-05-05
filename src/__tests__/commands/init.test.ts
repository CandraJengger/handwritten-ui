import { describe, it, expect, vi, beforeEach } from 'vitest';
import init from '../../commands/init';
import { config } from '@/config';
import { Template } from '@/enums';

// Mock dependencies
vi.mock('@/config', () => ({
  config: {
    vite: vi.fn(),
    next: vi.fn(),
  },
}));

vi.mock('chalk', () => ({
  default: {
    blue: (s: string) => s,
    green: (s: string) => s,
  },
}));

describe('init command', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call the vite config by default', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await init({});

    expect(config[Template.VITE]).toHaveBeenCalled();
    expect(vi.mocked(console.log)).toHaveBeenCalledWith(
      expect.stringContaining('Initializing skeci ui...'),
    );
    expect(vi.mocked(console.log)).toHaveBeenCalledWith(
      expect.stringContaining('Skeci UI initialized successfully!'),
    );
    consoleSpy.mockRestore();
  });

  it('should call the next config when specified', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await init({ template: Template.NEXT });

    expect(config[Template.NEXT]).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
