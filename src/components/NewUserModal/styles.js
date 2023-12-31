import styled from "styled-components";

export const Container = styled.form`
    h2 {
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    label {
        color: var(--text-title);
    }

    .date-div{
        margin-top: 0.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        input {
            width: 100%;
        }
    }

    input {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;

        border: 1px solid #d7d7d7;
        background: #e7e9ee;

        font-weight: 400;
        font-size: 1rem;

        &::placeholder {
            color: var(--text-body);
        }

        & + input {
            margin-top: 1rem;
        }

    }

    .button-div {
        display: flex;
        justify-content: space-between;
    }

    .button-div-model{
        width: 48%;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--green);
        color: #fff;
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        margin-top: 1.5rem;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;

        transition: filter 0.2s;

        cursor: pointer;

        &:hover {
            filter: brightness(0.9);
        }


    }
`;