/**
 * Integration test for project initialization
 * Tests that all workspace packages are properly configured and can be imported
 */

import { describe, it, expect } from '@jest/globals';

describe('Project Initialization', () => {
  it('should have valid package.json structure', () => {
    const rootPackage = require('../../package.json');
    
    expect(rootPackage.name).toBe('stockholm-sauna-directory');
    expect(rootPackage.workspaces).toEqual(['apps/*', 'packages/*']);
    expect(rootPackage.private).toBe(true);
  });

  it('should have all workspace packages configured', () => {
    const webPackage = require('../../apps/web/package.json');
    const typesPackage = require('../../packages/types/package.json');
    const configPackage = require('../../packages/config/package.json');
    const uiPackage = require('../../packages/ui/package.json');
    const dbPackage = require('../../packages/db/package.json');

    expect(webPackage.name).toBe('web');
    expect(typesPackage.name).toBe('@stockholm-sauna/types');
    expect(configPackage.name).toBe('@stockholm-sauna/config');
    expect(uiPackage.name).toBe('@stockholm-sauna/ui');
    expect(dbPackage.name).toBe('@stockholm-sauna/db');
  });

  it('should have Supabase client dependency', () => {
    const webPackage = require('../../apps/web/package.json');
    expect(webPackage.dependencies['@supabase/supabase-js']).toBe('2.43.4');
  });

  it('should have workspace dependencies configured', () => {
    const webPackage = require('../../apps/web/package.json');
    expect(webPackage.dependencies['@stockholm-sauna/types']).toBe('*');
    expect(webPackage.dependencies['@stockholm-sauna/config']).toBe('*');
    expect(webPackage.dependencies['@stockholm-sauna/ui']).toBe('*');
    expect(webPackage.dependencies['@stockholm-sauna/db']).toBe('*');
  });
});
