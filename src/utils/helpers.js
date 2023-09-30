export default {
  convertPriceToRupiah (price) {
    return 'Rp' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },

  fileToByteArray (file) {
    return new Promise((resolve, reject) => {
      try {
        let reader = new FileReader()
        let fileByteArray = []
        reader.readAsArrayBuffer(file)
        reader.onloadend = function (evt) {
          if (evt.target.readyState === FileReader.DONE) {
            let arrayBuffer = evt.target.result
            let array = new Uint8Array(arrayBuffer)
            for (let i = 0; i < array.length; i++) {
              fileByteArray.push(array[i])
            }
            resolve(fileByteArray)
          }
        }
      } catch (e) {
        reject(e)
      }
    })
  }
}
