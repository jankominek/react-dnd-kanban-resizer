import styled from "styled-components";

export const TaskKanbanBoxWrapper = styled.div`
    width: 25rem;
    min-height: 20rem;
    background: lightGray;
    border-radius: 5px;
    flex-direction: column;
`
export const KanbanBoxTitleField = styled.div`
    width: 100%:
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: lightBlue;
`

export const KanbanTitle = styled.span`
    font-size: 2rem;
`
export const KanbanComponentWrapper = styled.div`
    display: flex;
    flex: 1;
    border: 1px dotted black;
`