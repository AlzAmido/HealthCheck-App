import styled from "styled-components";

export const HealthCheckContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: auto;
  flex-wrap: wrap;
  margin: 1rem;
`;

export const EnvironmentContainer = styled.div`
  background-color: ${(props) => props.background};
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 49%;
  margin: 0.2rem;
  border: 1px solid #eee;
  color: #ececec;
  @media (max-width: 950px) {
    width: 100%;
  }
`;