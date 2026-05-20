// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { config } from 'node:process';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests', 
  timeout: 40*1000, //this is miliseconds //overriding existing timeout and this is for all tests
  expect:{
    timeout: 5000, //timeout for all assertions
  },
  use: {
    
    browserName: 'chromium',
    headless : false

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  },

  
});


