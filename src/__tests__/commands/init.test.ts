import { describe, it, expect, vi, beforeEach } from 'vitest';
import prompts from 'prompts';
import init from '../../commands/init';
import { config } from '@/config';
import { Template } from '@/enums';

// Mock dependencies
vi.mock('prompts');

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
    red: (s: string) => s,
  },
}));

describe('init command', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should prompt for template and call the selected config', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.mocked(prompts).mockResolvedValue({ template: Template.VITE });

    await init({});

    expect(prompts).toHaveBeenCalled();
    expect(config[Template.VITE]).toHaveBeenCalled();
    expect(vi.mocked(console.log)).toHaveBeenCalledWith(
      expect.stringContaining('Initializing skeci ui...'),
    );
    expect(vi.mocked(console.log)).toHaveBeenCalledWith(
      expect.stringContaining('Skeci UI initialized successfully!'),
    );
    consoleSpy.mockRestore();
  });

  it('should call the next config when specified via options (skipping prompts)', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await init({ template: Template.NEXT });

    expect(prompts).not.toHaveBeenCalled();
    expect(config[Template.NEXT]).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should log error when no template is selected', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.mocked(prompts).mockResolvedValue({ template: undefined });

    await init({});

    expect(vi.mocked(console.log)).toHaveBeenCalledWith(
      expect.stringContaining('No template selected.'),
    );
    expect(config[Template.VITE]).not.toHaveBeenCalled();
    expect(config[Template.NEXT]).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
