
test('Se valida el metodo cargaBoletosApartados', async () =>{
	const boletosResult =null;

	fetch('http://localhost:3006/servicioNumPagos/boletos' + "?idCliente=" + "61a5b8819acfb4d377fe57cd")
	.then((response) => {
		return response.json();
	})
	.then((boletos) => {
		boletosResult = boletos; 
	});

	expect(boletosResult).not.toEqual(null);
})

test('Se valida el metodo cargaBoletosApartados fallido', async () =>{
	const boletosResult =null;

	fetch('http://localhost:3006/servicioNumPagos/boletos' + "?idCliente=" + "61a5b8819acfb4d377fe7cd")
	.then((response) => {
		return response.json();
	})
	.then((boletos) => {
		boletosResult = boletos; 
	});

	expect(boletosResult).toEqual(null);
})