# magento-tech-assessment

##  :beginner: About
The project has been created as a part of technical assessment in one of the recruitment process. 
QA challenge was about to develop a test suite to validate key functionalities within the e-commerce platform.
Project consists automated test suit created in Playwright tool, together with designed manual test case and final test report. 
This is only a sample of how it can be implemented and skills of an author of this project. 

## :zap: Usage
To run automated test suit please follow instalation instruction. Created test case and final report can be opened from dedidated directory of this project.

###  :electric_plug: Installation
Please follow the following steps for successful installation:
1. **Clone the Repository:** Get started by cloning the repository to your local machine.

    ```
    git clone https://github.com/gwietrzy/magento-tech-assessment.git
    ```  
2. **Install Packages:** Navigate to the root directory and install the required npm packages by executing the following command in your terminal:

    ```
    npm install
    ```
3. **Install Playwright** by executing the following command in your terminal:

    ```
    npx playwright install
    ```  

###  :package: Commands
1. To run the test suit please run '**test:chrome:headless**' npm script:

   ![image](https://github.com/gwietrzy/magento-tech-assessment/assets/42980349/e50c589f-0525-481f-95eb-b1396ff2c75f)

2. HTML test report should be automatically displayed after all test suit run will be finished.
   If because of some reasons it won't be opened, please run '**test:show:report**' npm scrpit:

   ![image](https://github.com/gwietrzy/magento-tech-assessment/assets/42980349/cc76264d-9e87-4c7e-8ab6-af3588947172)

### :notebook: Pre-Requisites
  - If you are using VS Code, you can run the tests in UI mode using dedicated Playwright extension:

    ![image](https://github.com/gwietrzy/magento-tech-assessment/assets/42980349/854eafce-0c09-412b-b300-6c181a3b01a7)

  - After installation tests can be run from test explorer (what tests will run depends from what tree level they will be triggered - Run Test icon)

    ![image](https://github.com/gwietrzy/magento-tech-assessment/assets/42980349/09b7a13e-8f52-4d53-a8a3-292b6ac6ae84)


