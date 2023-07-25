CREATE TRIGGER trg_UpdateCantidad
ON CarroVendido
AFTER INSERT
AS
BEGIN
  UPDATE CarroModelo
  SET Cantidad = Cantidad - 1
  FROM CarroModelo
  INNER JOIN inserted ON CarroModelo.CarroModeloID = inserted.CarroModeloID;
END;

CREATE TRIGGER trg_UpdateVentas
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
    UPDATE Venta SET SaldoAbonado = @SaldoAbonado, SaldoPendiente= @SaldoPendiente where VentaID = @VentaID;
END;

CREATE TRIGGER trg_CrearTransacciones
ON Venta
AFTER INSERT
AS
BEGIN
    DECLARE @VentaID INT;
    DECLARE @UsuarioID INT;
    DECLARE @CarroVendidoID INT;
    DECLARE @Total DECIMAL(18, 2);
    DECLARE @Meses INT;
    DECLARE @Intereses DECIMAL(18, 2);
    DECLARE @SaldoPendiente DECIMAL(18, 2);
    DECLARE @SaldoAbonado DECIMAL(18, 2);
    
    SELECT @VentaID = VentaID,
           @UsuarioID = UsuarioID,
           @CarroVendidoID = CarroVendidoID,
           @Total = Total,
           @Meses = Meses,
           @Intereses = Intereses,
           @SaldoPendiente = SaldoPendiente,
           @SaldoAbonado = SaldoAbonado
    FROM inserted;
    DECLARE @Counter INT = 1;
    WHILE @Counter <= @Meses
    BEGIN
        DECLARE @TarjetaID INT;
        DECLARE @FechaTransaccion DATETIME;
        DECLARE @FechaCorte DATETIME;
        DECLARE @InteresesMorosidad DECIMAL(18, 2);
        DECLARE @Pagado BIT;
        DECLARE @Precio DECIMAL(18, 2);
        
        SELECT TOP (1) @TarjetaID = TarjetaID
        FROM [XtremeAutoNetCore].[dbo].[Tarjeta]
        WHERE UsuarioID = @UsuarioID;

        SET @FechaTransaccion = DATEADD(MONTH, @Counter, GETDATE());
        SET @FechaCorte = DATEADD(MONTH, @Counter + 1, GETDATE());
		SET @Pagado = 0;
		SET @Precio = @Total/@Meses;
		SET @InteresesMorosidad = 0;
        
        EXEC sp_AddTransaccion @VentaID, @TarjetaID, @FechaTransaccion, @FechaCorte, @InteresesMorosidad, @Pagado, @Precio;
        
        SET @Counter += 1;
    END;
END;