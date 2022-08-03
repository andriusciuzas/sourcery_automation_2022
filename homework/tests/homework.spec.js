// @ts-check
const { test, expect } = require("@playwright/test");

const data = ["Prototype", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const
positiveInteger = '8',
positiveFloat = '4.6',
zero = '0',
negativeInteger = '-4',
negativeFloat = '-7.3',
text = 'gh'

test.beforeEach(async ({ page }) => {
  await page.goto("https://testsheepnz.github.io/BasicCalculator");
});

data.forEach((build) => {
  test.describe(build + ": " + "Action: Concatenate", () => {
    chooseBuild(build,);
    enterFirstAndSecondNumbers(firstNumbet, secondNumber);

  });

  /**
   * @param {string} build
   * @param {string} action
   * @param {string} firstNumbet
   * @param {string} secondNumber
   * @param {boolean} onlyIntegers
   * @param {string} result
   */
  function basicFunctions(build, action, firstNumbet, secondNumber, onlyIntegers, result) {
    test(
      build +
        " Action: " +
        action +
        " " +
        firstNumbet +
        " and " +
        secondNumber +
        ". Result: " +
        result +
        ". Only integers: " +
        onlyIntegers,
      async ({ page }) => {
        /**
         * @param {any} build
         */
        function chooseBuild(build);
        /**
         * @param {any} firstNumber
         * @param {any} secondNumber
         */
        function enterFirstAndSecondNumbers(firstNumber, secondNumber);
        /**
         * @param {any} action
         */
        function selectOperation(action);
        /**
         * @param {any} onlyIntegers
         */
        function integersOnly(onlyIntegers);
        function clickCalculateButton();
        /**
         * @param {any} result
         */
        function getResult(result);
      }
    );
  }


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

function doubleCalculateButtonClick() {
  async ({ page }) => {
    await page.locator("#calculateButton").dblclick();
  };
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
