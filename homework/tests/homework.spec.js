// @ts-check
const { test, expect } = require("@playwright/test");

const data = ["Prototype", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const positiveInteger = "8",
  positiveFloat = "4.6",
  zero = "0",
  negativeInteger = "-4",
  negativeFloat = "-7.3",
  text = "gh",
  emptyField = "";

test.beforeEach(async ({ page }) => {
  await page.goto("https://testsheepnz.github.io/BasicCalculator");
});

data.forEach((build) => {
  test(build + ": Concatenate two positive integers", async ({ page }) => {
    await chooseBuild(build, page);
    await enterFirstAndSecondNumbers(positiveInteger, positiveInteger, page);
    await selectOperation("Concatenate", page);
    await integersOnly(false, page);
    await clickCalculateButton(page);
    await getResult("88", page);
  });
  test(
    build + ": Concatenate positive and negative integers",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveInteger, negativeInteger, page);
      await selectOperation("Concatenate", page);
      await integersOnly(false, page);
      await clickCalculateButton(page);
      await getResult("8-4", page);
    }
  );
  test(
    build + ": Add positive integer and positive float with integers only ON",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveInteger, positiveFloat, page);
      await selectOperation("Add", page);
      await integersOnly(true, page);
      await clickCalculateButton(page);
      await getResult("12", page);
    }
  );
  test(build + ": Add negative integer and zero", async ({ page }) => {
    await chooseBuild(build, page);
    await enterFirstAndSecondNumbers(negativeInteger, zero, page);
    await selectOperation("Add", page);
    await integersOnly(true, page);
    await clickCalculateButton(page);
    await getResult("-4", page);
  });
  test(
    build +
      ": Subtract positive integer and positive float with integers only OFF",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveInteger, positiveFloat, page);
      await selectOperation("Subtract", page);
      await integersOnly(false, page);
      await clickCalculateButton(page);
      await getResult("3.4", page);
    }
  );
  test(
    build +
      ": Subtract positive integer and positive float with integers only ON",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveInteger, positiveFloat, page);
      await selectOperation("Subtract", page);
      await integersOnly(true, page);
      await clickCalculateButton(page);
      await getResult("3", page);
    }
  );
  test(
    build +
      ": Multiply positive integer and positive float with integers only ON",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveInteger, positiveFloat, page);
      await selectOperation("Multiply", page);
      await integersOnly(true, page);
      await clickCalculateButton(page);
      await getResult("36", page);
    }
  );
  test(
    build +
      ": Multiply positive integer and positive float with integers only OFF",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveInteger, positiveFloat, page);
      await selectOperation("Multiply", page);
      await integersOnly(false, page);
      await clickCalculateButton(page);
      await getResult("36.8", page);
    }
  );
  test(
    build +
      ": Divide positive float and positive integer with integers only OFF",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveFloat, positiveInteger, page);
      await selectOperation("Divide", page);
      await integersOnly(false, page);
      await clickCalculateButton(page);
      await getResult("0.575", page);
    }
  );
  test(
    build +
      ": Divide positive integer and positive float with integers only ON",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveFloat, positiveInteger, page);
      await selectOperation("Divide", page);
      await integersOnly(true, page);
      await clickCalculateButton(page);
      await getResult("0", page);
    }
  );
  test(
    build +
      ": Divide positive integer and negative integer with integers only OFF",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveInteger, negativeInteger, page);
      await selectOperation("Divide", page);
      await integersOnly(false, page);
      await clickCalculateButton(page);
      await getResult("-2", page);
    }
  );
  test(build + ": Click calculate button twise", async ({ page }) => {
    await chooseBuild(build, page);
    await enterFirstAndSecondNumbers(positiveInteger, negativeInteger, page);
    await selectOperation("Divide", page);
    await integersOnly(false, page);
    await doubleCalculateButtonClick(page);
    await getResult("-2", page);
  });
  test(build + ": Clear button works properly", async ({ page }) => {
    await chooseBuild(build, page);
    await enterFirstAndSecondNumbers(positiveInteger, negativeInteger, page);
    await selectOperation("Divide", page);
    await integersOnly(false, page);
    await clickCalculateButton(page);
    await clickClearButton(page);
    await getResult("", page);
  });
  test(
    build + ": Correct error message when added text instead of first number",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(text, positiveInteger, page);
      await selectOperation("Add", page);
      await integersOnly(false, page);
      await clickCalculateButton(page);
      await correctErrorMessage("Number 1 is not a number", page);
    }
  );
  test(
    build + ": Correct error message when added text instead of second number",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveInteger, text, page);
      await selectOperation("Add", page);
      await integersOnly(false, page);
      await clickCalculateButton(page);
      await correctErrorMessage("Number 2 is not a number", page);
    }
  );
  test(
    build + ": Correct error message when divided by zero",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveInteger, zero, page);
      await selectOperation("Divide", page);
      await integersOnly(false, page);
      await clickCalculateButton(page);
      await correctErrorMessage("Divide by zero error!", page);
    }
  );
  test(
    build + ": Correct error message when divided by empty field",
    async ({ page }) => {
      await chooseBuild(build, page);
      await enterFirstAndSecondNumbers(positiveInteger, emptyField, page);
      await selectOperation("Divide", page);
      await integersOnly(false, page);
      await clickCalculateButton(page);
      await correctErrorMessage("Divide by zero error!", page);
    }
  );
});

/**
 * @param {string} build
 */
async function chooseBuild(build, page) {
  await page.selectOption("#selectBuild", { label: build });
}
/**
 * @param {string} firstNumber
 * @param {string} secondNumber
 */
async function enterFirstAndSecondNumbers(firstNumber, secondNumber, page) {
  await expect(page.locator("#number1Field")).toBeVisible();
  await page.locator("#number1Field").type(firstNumber);
  await expect(page.locator("#number2Field")).toBeVisible();
  await page.locator("#number2Field").type(secondNumber);
}

/**
 * @param {string} action
 */
async function selectOperation(action, page) {
  await page.selectOption("#selectOperationDropdown", { label: action });
}
/**
 * @param {boolean} onlyIntegers
 */
async function integersOnly(onlyIntegers, page) {
  await expect(page.locator("#integerSelect")).toBeVisible();
  await page.locator("#integerSelect").setChecked(onlyIntegers);
}
async function clickCalculateButton(page) {
  await expect(page.locator("#calculateButton")).toBeVisible();
  await page.locator("#calculateButton").click();
}
/**
 * @param {string} result
 */
async function getResult(result, page) {
  await expect(page.locator("#numberAnswerField")).toBeVisible();
  await expect(page.locator("#numberAnswerField")).toHaveValue(result);
}

async function doubleCalculateButtonClick(page) {
  await expect(page.locator("#calculateButton")).toBeVisible();
  await page.locator("#calculateButton").dblclick();
}

async function clickClearButton(page) {
  await expect(page.locator("#clearButton")).toBeVisible();
  await page.locator("#clearButton").click();
}

/**
 * @param {string} errorMessage
 */
async function correctErrorMessage(errorMessage, page) {
  await expect(page.locator("#errorMsgField")).toHaveText(errorMessage);
}
