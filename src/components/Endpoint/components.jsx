import styled from "styled-components";
import Loader from "react-loader-spinner";

export const EndpointContainer = styled.div`
  background-color: ${(props) => props.background};
  display: flex;
  padding: 0.3rem;
  padding-left: rem;
  padding-right: 0.5rem;
  margin: 1px;
  justify-content: space-between;
  height: 1.8rem;
`;

export const Endpoint = styled.span`
  font-size: 1.2rem;
  color: #fff;
`;

export const GoButton = styled.a`
  background-color: #fafdff9c;
  border: 2px solid #fafdff9c;
  border-radius: 8px;
  padding: 3px;
  margin: 3px;
  line-height: 15px;
  text-decoration: none;
  font-weight: bold;
  color: #333;
  &:hover {
    border: 2px solid hotpink;
  }
`;

export const Loading = styled(Loader)`
  margin: 5px;
`;

export const ResponseTime = styled.span`
  font-size: .8rem;
  color: #e5e340;
  margin-left: .5rem;
  font-weight: bold;
`
export const ResponseSize = styled.span`
  font-size: .8rem;
  color: #eee;
  margin-left: .5rem;
  padding-right: .2rem;
  font-weight: bold;
`