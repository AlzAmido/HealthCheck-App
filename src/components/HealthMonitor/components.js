import styled from "styled-components";
import Loader from "react-loader-spinner";

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

export const EndpointContainer = styled.div`
  background-color: ${(props) => props.background};
  display: flex;
  padding: 0.3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: 1px;
  justify-content: space-between;
`;

export const Endpoint = styled.span`
  font-size: 1.2rem;
  color: #fff;
`;

export const GoButton = styled.a`
  background-color: #fafdff9c;
  border: 2px solid #fafdff9c;
  border-radius: 8px;
  padding:3px;
  margin:3px;
  text-decoration: none;
  font-weight: bold;
  color: #333;
  &:hover{
    border: 2px solid hotpink;
  }
`

export const Loading = styled(Loader)`
  padding:5px;
  margin:5px;
`