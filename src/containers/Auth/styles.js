export default {
    formContainer: {
        maxWidth: 400,
        margin: 'auto',
        padding: 12,
        boxSizing: 'border-box'
    },
    inputItem: {
        height: 48,
        '&+$inputItem': {
            marginTop: 12
        }
    },
    buttonItem: {
        margin: '6px 0'
    },
    button: {
        width: '100%',
        height: 48
    },
    orLabel: {
        fontSize: '14px',
        textTransform: 'uppercase',
        margin: '6px 0',
        textAlign: 'center'
    },
    smallLabel: {
        fontSize: '12px',
        textAlign: 'right'
    }
}
