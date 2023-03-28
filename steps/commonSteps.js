import {expect, test} from "@playwright/test";


export default class CommonSteps {

    constructor(page){
        this.page = page;
    }

    async goTo(url){
        await test.step(`go to ${url}`, async () => {
            await this.page.goto(url);
        })
    }

    async addTask(taskName){
        await test.step(`Add task with name ${taskName}`, async () => {
            await this.page.locator(`//span[text()='Add']/../../input`).fill(taskName);
            await this.page.locator(`//span[text()='Add']`).click();
        })
    }

    async checkIfTaskExistInColumnwithId(taskName, columnId){
        await test.step(`Check if task with name ${taskName} exist in column with id ${columnId}`, async () => {
            await expect(await this.page.locator(`//div[@data-rbd-droppable-id='${columnId}']//div[text()='${taskName}']`).isVisible()).toBe(true);
        })
    }

    async checkIfTaskExistInColAtPosition(task, colId, position){
        await test.step(`I check if task ${task} exist in column ${colId} at position ${position}`, async () => {
            await expect(await this.page.locator(`//div[@data-rbd-droppable-id='${colId}']//div[${position}]`).textContent()).toBe(task);
        })
    }

    async addKanbanBoardAndSetName(name){
        await test.step(`I add new kanban board and set name ${name}`, async () => {
            await this.page.locator(`//div[@data-test='addKanban']`).click();
            await this.page.locator(`//input[@data-test='newKanbanInput']`).fill(name);
            await this.page.locator(`//input[@data-test='newKanbanInput']/../*[@data-test='svg']`).click();
        })
    }

    async checkIfKanbanBoardWithNameExist(name){
        await test.step(`I check if kanban board with name ${name} exist`, async () => {
            await expect(await this.page.locator(`//p[text()='${name}']`).isVisible()).toBe(true);
        })
    }
    async dragAndDrop(subjectSelector, targetSelector, position){
            await test.step(`Drag n drop`, async () => {
                const subjectElement = await this.page.waitForSelector(subjectSelector);
                const targetElement = await this.page.waitForSelector(targetSelector);
                
                const subjectElementBound = await subjectElement.boundingBox();
                const targetElementBound = await targetElement.boundingBox();

                await this.page.mouse.move(
                subjectElementBound.x,
                subjectElementBound.y,
                { steps: 10 } 
                );

                await this.page.dispatchEvent(
                subjectSelector,
                'mousedown',
                {
                    button: 0,
                    force: true
                }
                );
        
                const x = targetElementBound.x + targetElementBound.width / 2;
                const y = targetElementBound.y + (subjectElementBound.height * position) + 30;

                await this.page.mouse.move(x, y, { steps: 10 }); 

                await this.page.dispatchEvent(targetSelector, 'mouseup', {
                button: 0,
                force: true
                });
                    })
                }
}