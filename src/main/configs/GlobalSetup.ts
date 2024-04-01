import {rimraf} from "rimraf";

async function globalSetup(): Promise<void> {
    await new Promise((resolve) => {
        try {
            rimraf.rimraf('./reports/allure-results');
            console.log('\nDirectory removed successfully synchronously.');
          } catch (error) {
            console.log(error);
          }
    });
}

export default globalSetup;