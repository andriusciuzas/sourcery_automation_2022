// @ts-check
const { test, expect } = require("@playwright/test");

const data = ["Prototype", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

test.beforeEach(async ({ page }) => {
  await page.goto("https://testsheepnz.github.io/BasicCalculator");
});

data.forEach((build) => {
  test.describe(build + ": " + "Action: Concatenate", () => {
    basicFunctions(build, "Concatenate", "2", "3", false, "23");
    basicFunctions(build, "Concatenate", "6", "-7", false, "6-7");
  });

  test.describe(build + ": " + "Action: Add", () => {
    basicFunctions(build, "Add", "2", "3.4", true, "5");
    basicFunctions(build, "Add", "-1", "0", false, "-1");
  });

  test.describe(build + ": " + "Action: Subtract", () => {
    basicFunctions(build, "Subtract", "4.2", "8.6", false, "-4.4");
    basicFunctions(build, "Subtract", "8.6", "4.2", true, "4");
  });

  test.describe(build + ": " + "Action: Multiply", () => {
    basicFunctions(build, "Multiply", "8.68", "10", true, "86");
    basicFunctions(build, "Multiply", "8.68", "10", false, "86.8");
  });

  test.describe(build + ": " + "Action: Divide", () => {
    basicFunctions(build, "Divide", "9", "4", false, "2.25");
    basicFunctions(build, "Divide", "9", "4", true, "2");
    basicFunctions(build, "Divide", "50", "-2", false, "-25");
  });

  test.describe(
    build + ": Double Calculate button click wokrs properly",
    () => {
      doubleCalculateButtonClick(build, "Add", "5", "7", "12");
    }
  );

  test.describe(build + ": Check Clear button", () => {
    clearButtonWorks(build, "Add", "2", "3", "");
  });

  test.describe(build + ": Error messages test", () => {
    correctErrorMessage(build, "Add", "gh", "3", "Number 1 is not a number");
    correctErrorMessage(
      build,
      "Multiply",
      "5",
      "df",
      "Number 2 is not a number"
    );
    correctErrorMessage(build, "Divide", "78", "0", "Divide by zero error!");
    correctErrorMessage(build, "Divide", "78", "", "Divide by zero error!");
  });
});

/**
 * @param {string} build
 */
function chooseBuild(build) {
  test("Build " + build, async ({ page }) => {
    await page.selectOption("#selectBuild", { label: build });
  });
}
/**
 * @param {string} firstNumber
 * @param {string} secondNumber
 */
function enterFirstAndSecondNumbers(firstNumber, secondNumber) {
  test(
    "First number " + firstNumber + "Second number " + secondNumber,
    async ({ page }) => {
      await page.locator("#number1Field").type(firstNumber);
      await page.locator("#number2Field").type(firstNumber);
    }
  );
}
/**
 * @param {string} action
 */
function selectOperation(action) {
  test("Operation: " + action, async ({ page }) => {
    await page.selectOption("#selectOperationDropdown", { label: action });
  });
}
/**
 * @param {boolean} onlyIntegers
 */
function integersOnly(onlyIntegers) {
  test("Integers only selected: " + onlyIntegers, async ({ page }) => {
    await page.locator("#integerSelect").setChecked(onlyIntegers);
  });
}
function clickCalculateButton() {
  async ({ page }) => {
    await page.locator("#calculateButton").click();
  };
}
/**
 * @param {string} result
 */
function getResult(result) {
  test("Result: " + result, async ({ page }) => {
    await expect(page.locator("#numberAnswerField")).toHaveValue(result);
  });
}

/**
 * @param {string} build
 * @param {string} action
 * @param {string} number1
 * @param {string} number2
 * @param {string} result
 */
function doubleCalculateButtonClick(build, action, number1, number2, result) {
    async ({ page }) => {
      await page.locator("#calculateButton").dblclick();
    }
  ;
}


function clickClearButton() {
  test("Clear button works.", async ({ page }) => {
    await page.locator("#clearButton").click();
  });
}

/**
 * @param {string} errorMessage
 */
function correctErrorMessage(errorMessage) {
  async ({ page }) => {
    await expect(page.locator("#errorMsgField")).toHaveText(errorMessage);
  };
}
