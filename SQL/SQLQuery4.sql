-- =============================================
-- Author:		<Author:Dennis Serrano>
-- Create date: <Create Date: 08-07-2023>
-- Description:	<Description: SP Delete>
-- =============================================

-- =============================================
USE [XtremeAutoNetCore]
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_DeleteRol
    @RolID INT
AS
BEGIN
    DELETE FROM Rol
    WHERE RolID = @RolID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_DeleteRueda
    @RuedaID INT
AS
BEGIN
    DELETE FROM Rueda
    WHERE RuedaID = @RuedaID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_DeleteColor
    @ColorID INT
AS
BEGIN
    DELETE FROM Color
    WHERE ColorID = @ColorID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_DeleteSeguro
    @SeguroID INT
AS
BEGIN
    DELETE FROM Seguro
    WHERE SeguroID = @SeguroID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_DeleteCarroModelo
    @CarroModeloID INT
AS
BEGIN
    DELETE FROM CarroModelo
    WHERE CarroModeloID = @CarroModeloID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_DeleteCarroVendido
    @CarroVendidoID INT
AS
BEGIN
    DELETE FROM CarroVendido
    WHERE CarroVendidoID = @CarroVendidoID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_DeleteUsuario
    @UsuarioID INT
AS
BEGIN
    DELETE FROM Usuario
    WHERE UsuarioID = @UsuarioID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_DeleteVenta
    @VentaID INT
AS
BEGIN
    DELETE FROM Venta
    WHERE VentaID = @VentaID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_DeleteTarjeta
    @TarjetaID INT
AS
BEGIN
    DELETE FROM Tarjeta
    WHERE TarjetaID = @TarjetaID
END
GO
-- =============================================

-- =============================================
CREATE PROCEDURE sp_DeleteTransaccion
    @TransaccionID INT
AS
BEGIN
    DELETE FROM Transaccion
    WHERE TransaccionID = @TransaccionID
END
GO
-- =============================================
