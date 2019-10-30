import React from 'react';
import { Button } from 'reactstrap';

const wait = (timeout = 2000) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

const wakeUp = async () => {
  console.log('1. Waking up');
  await wait();
  console.log('2. I am ready');
};

const washTeeth = async () => {
  console.log('3. Started washing teeth');
  await wait();
  console.log('4. Washed teeth');
};

const goToWork = async () => {
  console.log('5. Commiting to work');
  await wait();
  console.log('6. At work');
};

const preWork = () => {
  console.group('preWork()');
  wakeUp()
    .then(washTeeth)
    .then(goToWork)
    .then(() => {
      console.log('Work preparation completed');
    })
    .catch(() => {
      console.log('Staying at home today');
    })
    .finally(() => {
      console.groupEnd('preWork()');
    });
};

const preWorkAsync = async () => {
  console.group('preWorkAsync()');
  try {
    await wakeUp();
    await washTeeth();
    await goToWork();
    console.log('Work preparation completed');
  } catch (error) {
    console.log('Staying at home today');
  } finally {
    console.groupEnd('preWorkAsync()');
  }
};

const preWorkParallel = async () => {
  console.group('preWorkParallel()');
  try {
    await Promise.all([wakeUp(), washTeeth(), goToWork()]);
    console.log('Work preparation completed');
  } catch (error) {
    console.log('Staying at home today');
  } finally {
    console.groupEnd('preWorkParallel()');
  }
};

const preWorkTimeout = async () => {
  const method = Math.random() < 0.5 ? preWorkAsync : preWorkParallel;

  const throwAfterTimeout = async () => {
    await wait(3000);
    throw new Error('Request timeout');
  };

  Promise.race([
    method(),
    throwAfterTimeout(),
  ]);
};

const Promises = () => (
  <>
    <Button onClick={preWork}>Work preparation</Button>
    <Button onClick={preWorkAsync}>Work preparation(async/await)</Button>
    <Button onClick={preWorkParallel}>Work preparation (parallel)</Button>
    <Button onClick={preWorkTimeout}>Work preparation (Race)</Button>
  </>
);

export default Promises;
