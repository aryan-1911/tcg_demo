import React from 'react'

interface Props {
    className?: string
}

export const LeftArrow: React.FC<Props> = props => (
    <svg className={props.className || ''} viewBox="0 0 26 22" fill="none">
        <path d="M23.375 21.5C16.25 18.25 9 15 -9.39795e-07 10.75C8.875 6.625 16 3.375 23.25 1.74846e-07C23.875 0.25 24.375 0.5 25 0.75C18.375 7.375 16.625 13.875 25.25 20.125C24.625 20.625 24 21 23.375 21.5Z" fill="white" />
    </svg>
);

export const RightArrow: React.FC<Props> = props => (
    <svg className={props.className || ''} viewBox="0 0 26 22" fill="none">
        <path d="M2.625 21.5C9.75 18.25 17 15 26 10.75C17.125 6.625 10 3.375 2.75 1.74846e-07C2.125 0.25 1.625 0.5 1 0.75C7.625 7.375 9.375 13.875 0.75 20.125C1.375 20.625 2 21 2.625 21.5Z" fill="white" />
    </svg>
);

export const DownArrow: React.FC<Props> = props => <svg className={props.className || ''} viewBox="0 0 21 21">
    <path d="M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z" fill-rule="evenodd"></path>
</svg>