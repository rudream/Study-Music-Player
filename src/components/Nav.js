import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faGit, faGithub } from "@fortawesome/free-brands-svg-icons";

const Nav = ({ setLibraryStatus, libraryStatus }) => {
    const openLibraryHandler = () => {
        setLibraryStatus(!libraryStatus);
    };

    return (
        <nav>
            <a href="https://github.com/rudream">
                <FontAwesomeIcon icon={faGithub} size="3x" />
            </a>
            <button
                className={libraryStatus ? "library-active" : ""}
                onClick={openLibraryHandler}
            >
                Library <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
            </button>
        </nav>
    );
};

export default Nav;
