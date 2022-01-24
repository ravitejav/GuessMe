export const getCssForPencil = (size: number) => {
    return {
        fontSize: size + 'px',
        height: size + 'px',
        width: size + 'px',
        borderRadius: '50%',
        backgroundColor: 'var(--blue-color)',
    }
}

export const getColorCss = (color: string) => {
    return {
        width: '3rem',
        height: '3rem',
        backgroundColor: color,
    }
} 