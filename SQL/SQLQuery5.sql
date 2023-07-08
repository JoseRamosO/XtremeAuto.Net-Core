-- =============================================
-- Author:		<Author:Dennis Serrano>
-- Create date: <Create Date: 08-07-2023>
-- Description:	<Description: SP Update>
-- =============================================

-- =============================================
USE [XtremeAutoNetCore]
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_UpdateRol
    @RolID INT,
    @Nombre NVARCHAR(30)
AS
BEGIN
    UPDATE Rol
    SET Nombre = @Nombre
    WHERE RolID = @RolID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_UpdateRueda
    @RuedaID INT,
    @Nombre NVARCHAR(30),
    @Imagen IMAGE,
    @Precio DECIMAL(18,2)
AS
BEGIN
    UPDATE Rueda
    SET Nombre = @Nombre,
        Imagen = @Imagen,
        Precio = @Precio
    WHERE RuedaID = @RuedaID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_UpdateColor
    @ColorID INT,
    @Nombre NVARCHAR(30),
    @Imagen IMAGE
AS
BEGIN
    UPDATE Color
    SET Nombre = @Nombre,
        Imagen = @Imagen
    WHERE ColorID = @ColorID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_UpdateSeguro
    @SeguroID INT,
    @Nombre NVARCHAR(30),
    @Plazo INT,
    @Precio DECIMAL(18,2)
AS
BEGIN
    UPDATE Seguro
    SET Nombre = @Nombre,
        Plazo = @Plazo,
        Precio = @Precio
    WHERE SeguroID = @SeguroID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_UpdateCarroModelo
    @CarroModeloID INT,
    @Disponible BIT,
    @Tipo NVARCHAR(30),
    @Marca NVARCHAR(60),
    @Modelo NVARCHAR(100),
    @Descripcion NVARCHAR(4000),
    @Precio DECIMAL(18,2),
    @Imagen IMAGE,
    @Cantidad INT
AS
BEGIN
    UPDATE CarroModelo
    SET Disponible = @Disponible,
        Tipo = @Tipo,
        Marca = @Marca,
        Modelo = @Modelo,
        Descripcion = @Descripcion,
        Precio = @Precio,
        Imagen = @Imagen,
        Cantidad = @Cantidad
    WHERE CarroModeloID = @CarroModeloID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_UpdateCarroVendido
    @CarroVendidoID INT,
    @RuedaID INT,
    @ColorID INT,
    @CarroModeloID INT,
    @SeguroID INT,
    @PrecioTotal DECIMAL(18,2)
AS
BEGIN
    UPDATE CarroVendido
    SET RuedaID = @RuedaID,
        ColorID = @ColorID,
        CarroModeloID = @CarroModeloID,
        SeguroID = @SeguroID,
        PrecioTotal = @PrecioTotal
    WHERE CarroVendidoID = @CarroVendidoID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_UpdateUsuario
    @UsuarioID INT,
    @Nombre NVARCHAR(50),
    @Apellido NVARCHAR(50),
    @Salario DECIMAL(18,2),
    @Cedula NVARCHAR(15),
    @Email NVARCHAR(256),
    @PasswordHash NVARCHAR(MAX),
    @SecurityStamp NVARCHAR(MAX),
    @Telefono NVARCHAR(30),
    @Username NVARCHAR(50),
    @RolID INT,
    @LockoutEnabled BIT,
    @FailedAttemptsCount INT,
    @LockoutEndDateUtc DATETIME
AS
BEGIN
    UPDATE Usuario
    SET Nombre = @Nombre,
        Apellido = @Apellido,
        Salario = @Salario,
        Cedula = @Cedula,
        Email = @Email,
        PasswordHash = @PasswordHash,
        SecurityStamp = @SecurityStamp,
        Telefono = @Telefono,
        Username = @Username,
        RolID = @RolID,
        LockoutEnabled = @LockoutEnabled,
        FailedAttemptsCount = @FailedAttemptsCount,
        LockoutEndDateUtc = @LockoutEndDateUtc
    WHERE UsuarioID = @UsuarioID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_UpdateVenta
    @VentaID INT,
    @UsuarioID INT,
    @CarroVendidoID INT,
    @Total DECIMAL(18,2),
    @Meses INT,
    @Intereses DECIMAL(18,2),
    @SaldoPendiente DECIMAL(18,2),
    @SaldoAbonado DECIMAL(18,2)
AS
BEGIN
    UPDATE Venta
    SET UsuarioID = @UsuarioID,
        CarroVendidoID = @CarroVendidoID,
        Total = @Total,
        Meses = @Meses,
        Intereses = @Intereses,
        SaldoPendiente = @SaldoPendiente,
        SaldoAbonado = @SaldoAbonado
    WHERE VentaID = @VentaID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_UpdateTarjeta
    @TarjetaID INT,
    @UsuarioID INT,
    @Nombre NVARCHAR(60),
    @NumeroDeTarjeta NVARCHAR(30),
    @CVV NVARCHAR(10),
    @FechaVencimiento DATETIME
AS
BEGIN
    UPDATE Tarjeta
    SET UsuarioID = @UsuarioID,
        Nombre = @Nombre,
        NumeroDeTarjeta = @NumeroDeTarjeta,
        CVV = @CVV,
        FechaVencimiento = @FechaVencimiento
    WHERE TarjetaID = @TarjetaID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_UpdateTransaccion
    @TransaccionID INT,
    @VentaID INT,
    @TarjetaID INT,
    @FechaTransaccion DATETIME,
    @FechaCorte DATETIME,
    @InteresesMorosidad DECIMAL(18,2),
    @Pagado BIT,
    @Precio DECIMAL(18,2)
AS
BEGIN
    UPDATE Transaccion
    SET VentaID = @VentaID,
        TarjetaID = @TarjetaID,
        FechaTransaccion = @FechaTransaccion,
        FechaCorte = @FechaCorte,
        InteresesMorosidad = @InteresesMorosidad,
        Pagado = @Pagado,
        Precio = @Precio
    WHERE TransaccionID = @TransaccionID
END
GO
-- =============================================
