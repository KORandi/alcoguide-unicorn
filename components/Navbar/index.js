import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Input, Menu } from "semantic-ui-react";

const Navbar = () => {
    const router = useRouter();
    const handleOnClick = (route) => {
        router.push(route);
    }
    return (
        <Container>
            <Menu secondary>
                <Menu.Item name="search" onClick={() => {handleOnClick("search")}} />
                <Menu.Item name="recipes" onClick={() => {handleOnClick("recipe")}} />
                <Menu.Item name="ingredients" onClick={() => {handleOnClick("ingredient")}} />
                <Menu.Menu position="right">
                    <Menu.Item name="login" />
                </Menu.Menu>
            </Menu>
        </Container>
    );
};

export default Navbar;
