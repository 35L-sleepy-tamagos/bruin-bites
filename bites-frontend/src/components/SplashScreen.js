import styled from "styled-components";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";

//margin: shifts it, why did this one line of code take me 40 minutes to find out
const Toggle = styled.button`
    cursor: pointer;
    height: 50px;
    width: 50px;   
    border-radius: 50%;
    border: none;
    margin: -1em 1em;
    background-color: ${props => props.theme.titleColor};
    color: ${props => props.theme.pageBackground};
    &:focus {
        outline: none;
    }
    transition: all .5s ease;
`;


function Splash(props) 
{
    /* setDark and setLight inspired by https://codesandbox.io/s/dry-meadow-64786?from-embed=&file=/src/DarkMode.tsx */
    const setDark = () => {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
    };
    
    const setLight = () => {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
    };

    function changeTheme() 
    {
        if (props.theme === "light") 
        {
            props.setTheme("dark");
            setDark();
        } else {
            props.setTheme("light");
            setLight();
        }        
    };

    const icon = props.theme === "dark" ? <HiMoon size={40} /> : <CgSun size={40} />;
    return (
    <Toggle onClick={changeTheme} >
        {icon}
    </Toggle>
    );
};

export default Splash;
