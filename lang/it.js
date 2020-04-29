export default () => {
  return new Promise((resolve) => {
    resolve({
      'hello': 'Lorem ipsum',
      'contacts': {

      },
      'address': {
        email: 'e-mail',
        phone: 'Telefono',
        street: 'Indirizzo'
      }
    })
  })
}
