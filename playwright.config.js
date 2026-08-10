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

  reporter: 'html', //for generating report with screenshots and logs
  use: {
    
    browserName: 'chromium',
    headless : true,
    actionTimeout: 10 * 1000, //this line is written for global action timeout
    navigationTimeout: 30 * 1000, //this line is written for navigation timeout like when page.goto is used to navigate to any page
    screenshot: 'on', //takes screenshot at each step
    //trace: 'on' //take the logs at each step
    // if want to generate traces only on failure give like - trace: 'retain-on-failure'
    trace: 'retain-on-failure'

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  },

  
});


