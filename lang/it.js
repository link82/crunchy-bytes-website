export default () => {
  return new Promise((resolve) => {
    resolve({
      'hello': 'Lorem ipsum',
      'ok': 'Ok',
      'contacts': {

      },
      'cookies': {
        'message': 'We use cookie bla bla bla cookie bla bla bla cookie bla bla bla cookie bla bla bla'
      },
      'address': {
        email: 'e-mail',
        phone: 'Telefono',
        street: 'Indirizzo'
      }
    })
  })
}
