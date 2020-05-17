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
  width:49%;
  margin: .2rem;
  border: 1px solid #eee;
  @media(max-width: 950px) {
    width: 100%;
  }
`;

export const EndpointContainer = styled.div`
  background-color: ${(props) => props.background};
  display: flex;
  padding:.5rem;
`;
