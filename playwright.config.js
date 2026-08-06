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
    timeout: 5000, //timeout for  all assertions
  },
  use: {
    
    browserName: 'chromium',
    headless : true,
    actionTimeout: 10 * 1000, //this line is written for global action timeout
    navigationTimeout: 30 * 1000 //this line is written for navigation timeout like when page.goto is used to navigate to any page

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  },

  
});


