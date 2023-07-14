ALTER TRIGGER trg_UpdateVentas
ON TRANSACCION
AFTER UPDATE
AS
BEGIN
    DECLARE @SaldoPendiente decimal;
    DECLARE @SaldoAbonado decimal;
	DECLARE @VentaID int;
	DECLARE @Precio decimal;
    SELECT @VentaID = VentaID,
           @Precio = Precio
    FROM inserted;
    SET @SaldoAbonado = (Select SUM (Precio) from Transaccion where VentaID = @VentaID AND Pagado=1);
	IF @SaldoAbonado IS NULL
        SET @SaldoAbonado = 0;
    SET @SaldoPendiente = (Select Total from venta where VentaID = @VentaID) - @SaldoAbonado;
    UPDATE Venta SET SaldoAbonado = @SaldoAbonado, SaldoPendiente= @SaldoPendiente where VentaID = @VentaID;
END;


select * from transaccion

    "transaccionId": 4,
    "ventaId": 5,
    "tarjetaId": 10,
    "fechaTransaccion": "2023-08-14T17:16:47.933",
    "fechaCorte": "2023-09-14T17:16:47.933",
    "interesesMorosidad": 0,
    "pagado": true,
    "precio": 2376

UPDATE transaccion SET VentaID = 5, tarjetaID = 10
, FechaCorte = '2023-08-14T17:16:47.933', FechaTransaccion ='2023-09-14T17:16:47.933', InteresesMorosidad=0, Pagado=1, Precio= 2376 WHERE TransaccionID=4;