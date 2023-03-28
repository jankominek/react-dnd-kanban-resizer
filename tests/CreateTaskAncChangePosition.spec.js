import {test} from "@playwright/test";
import CommonSteps from "../steps/commonSteps";


test("Create task and change position", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const commonSteps = new CommonSteps(page);

    await commonSteps.goTo("http://localhost:3000");

    await commonSteps.checkIfTaskExistInColumnwithId("task 1", "backlog");
    await commonSteps.checkIfTaskExistInColumnwithId("task 2", "backlog");
    await commonSteps.checkIfTaskExistInColumnwithId("task 3", "backlog");

    await commonSteps.addTask("temp task 1");
    await commonSteps.addTask("temp task 2");
    await commonSteps.addTask("temp task 3");

    await commonSteps.checkIfTaskExistInColumnwithId("temp task 1", "backlog");
    await commonSteps.checkIfTaskExistInColumnwithId("temp task 2", "backlog");
    await commonSteps.checkIfTaskExistInColumnwithId("temp task 3", "backlog");

    await commonSteps.dragAndDrop(`//div[@data-rbd-draggable-id='task 1']`, `//div[@data-rbd-droppable-id='inProgress']`, 1);
    await commonSteps.checkIfTaskExistInColAtPosition("task 1","inProgress", 1);
    await commonSteps.dragAndDrop(`//div[@data-rbd-draggable-id='task 2']`, `//div[@data-rbd-droppable-id='inProgress']`, 2);
    await commonSteps.checkIfTaskExistInColAtPosition("task 2","inProgress", 2);
    await commonSteps.dragAndDrop(`//div[@data-rbd-draggable-id='task 3']`, `//div[@data-rbd-droppable-id='inProgress']`, 3);
    await commonSteps.checkIfTaskExistInColAtPosition("task 3","inProgress", 3);

    await commonSteps.dragAndDrop(`//div[@data-rbd-draggable-id='temp task 1']`, `//div[@data-rbd-droppable-id='inProgress']`, 4);
    await commonSteps.checkIfTaskExistInColAtPosition("temp task 1","inProgress", 4);
    await commonSteps.dragAndDrop(`//div[@data-rbd-draggable-id='temp task 2']`, `//div[@data-rbd-droppable-id='inProgress']`, 5);
    await commonSteps.checkIfTaskExistInColAtPosition("temp task 2","inProgress", 5);
    await commonSteps.dragAndDrop(`//div[@data-rbd-draggable-id='temp task 3']`, `//div[@data-rbd-droppable-id='inProgress']`, 6);
    await commonSteps.checkIfTaskExistInColAtPosition("temp task 3","inProgress", 6);
    
    await context.close();

})
