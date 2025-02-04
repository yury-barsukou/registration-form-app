# Documentation for `.github/workflows/ci.yml`

## Technical Documentation

### Purpose
The `.github/workflows/ci.yml` file is a GitHub Actions workflow configuration file designed to automate the process of running unit tests for the project. This workflow is triggered on pull requests to the `main` branch and can also be manually triggered via the GitHub Actions interface.

### Architecture
The workflow consists of a single job named `test` which runs on the latest version of Ubuntu. The job includes the following steps:
1. **Checkout Repository:** Uses the `actions/checkout@v3` action to clone the repository.
2. **Setup Node.js:** Uses the `actions/setup-node@v3` action to set up Node.js version 20.x.
3. **Install Dependencies:** Runs `npm install` to install the project's dependencies.
4. **Run Unit Tests:** Executes `npm test` to run the unit tests.

### Core Logic
- **Triggering Events:** The workflow is triggered by pull requests to the `main` branch and can also be manually triggered.
- **Job Execution:** The job named `test` runs on an `ubuntu-latest` runner and follows a sequence of steps to set up the environment, install dependencies, and run tests.

## User Guide

### How to Use
1. **Triggering the Workflow:**
   - **Automatically:** The workflow is automatically triggered when a pull request is made to the `main` branch.
   - **Manually:** You can manually trigger the workflow via the GitHub Actions interface by selecting the workflow and clicking on the "Run workflow" button.

2. **Steps Executed:**
   - **Checkout Repository:** The repository is cloned to the runner.
   - **Setup Node.js:** Node.js version 20.x is installed.
   - **Install Dependencies:** All project dependencies are installed using `npm install`.
   - **Run Unit Tests:** Unit tests are executed using `npm test`.

### Example
To see the workflow in action, create a pull request to the `main` branch. The workflow will automatically run and you can view the results in the "Actions" tab of your GitHub repository.

## Testing Checklist

- **Triggering Events:**
  - [ ] Verify that the workflow triggers on pull requests to the `main` branch.
  - [ ] Verify that the workflow can be manually triggered via the GitHub Actions interface.

- **Job Execution:**
  - [ ] Ensure the repository is correctly checked out.
  - [ ] Confirm that Node.js version 20.x is installed.
  - [ ] Check that all dependencies are installed without errors.
  - [ ] Validate that unit tests are executed and results are reported.

- **Edge Cases:**
  - [ ] Test with a pull request that has no changes affecting the tests.
  - [ ] Test with a pull request that includes changes causing tests to fail.
  - [ ] Manually trigger the workflow to ensure it runs as expected.
