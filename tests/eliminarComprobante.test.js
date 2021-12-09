test('Se valida el metodo eliminarComprobante', async () => {

	fetch('http://localhost:3006/servicioNumPagos/boletos/comprobantes?idBoleto=61a5b9500faf4869a03c4567', {
		method: 'DELETE'
	})
		.then(res => {
			window.location = "./index.html";
			expect(res.statusCode).toBe(200);
		})
		.catch(err => {
			console.log(err.message);
		});

})

test('Se valida el metodo eliminarComprobante fallido', async () => {

	fetch('http://localhost:3006/servicioNumPagos/boletos/comprobantes?idBoleto=61a5b9500faf4869a03c456', {
		method: 'DELETE'
	})
		.then(res => {
			window.location = "./index.html";
			
		})
		.catch(err => {
			console.log(err.message);
			expect(res.statusCode).toBe(500);
		});

})