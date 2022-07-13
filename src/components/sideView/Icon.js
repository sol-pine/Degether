import React from "react";
import styled from "styled-components";

function Plus() {
  return (
    <PlusIcon>
      <svg
        width="22"
        height="23"
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.4286 12.6233H12.5714V20.4892C12.5714 21.3545 11.8643 22.0624 11 22.0624C10.1357 22.0624 9.42857 21.3545 9.42857 20.4892V12.6233H1.57143C0.707143 12.6233 0 11.9154 0 11.0501C0 10.1849 0.707143 9.47695 1.57143 9.47695H9.42857V1.61105C9.42857 0.745804 10.1357 0.0378723 11 0.0378723C11.8643 0.0378723 12.5714 0.745804 12.5714 1.61105V9.47695H20.4286C21.2929 9.47695 22 10.1849 22 11.0501C22 11.9154 21.2929 12.6233 20.4286 12.6233Z"
          fill="#EFEFEF"
        />
      </svg>
    </PlusIcon>
  );
}

function Folder() {
  return (
    <FolderIcon>
      <svg
        width="28"
        height="23"
        viewBox="0 0 28 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.75 2.76088H13.75L11.8058 0.814461C11.2901 0.298261 10.5902 0.0078125 9.8615 0.0078125H2.75C1.2375 0.0078125 0 1.24669 0 2.76088V19.2793C0 20.7935 1.2375 22.0323 2.75 22.0323H24.75C26.2625 22.0323 27.5 20.7935 27.5 19.2793V5.51394C27.5 3.99976 26.2625 2.76088 24.75 2.76088Z"
          fill="white"
        />
      </svg>
    </FolderIcon>
  );
}

export { Plus, Folder };

const PlusIcon = styled.div`
  padding-top: 8px;
`;
const FolderIcon = styled.div`
  padding-top: 8px;
`;
