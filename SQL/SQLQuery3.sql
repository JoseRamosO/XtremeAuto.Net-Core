-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

USE [XtremeAutoNetCore]
GO

create procedure sp_AddRol
	@RolID int,
	@Nombre nvarchar(30)

	as
	begin

INSERT INTO [dbo].[Rol]
           ([Nombre])
     VALUES
           (@Nombre)
end


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

USE [XtremeAutoNetCore]
GO

create procedure sp_AddCarroModelo

	@CarroModeloID int,
	@Disponible bit,
	@Tipo nvarchar(30),
    @Marca nvarchar(60),
    @Modelo nvarchar(100),
    @Descripcion nvarchar(4000),
    @Precio decimal(18,2),
	@Cantidad int
           
		   as
		   begin

INSERT INTO [dbo].[CarroModelo]
           ([Disponible]
           ,[Tipo]
           ,[Marca]
           ,[Modelo]
           ,[Descripcion]
           ,[Precio]
           ,[Cantidad])
     VALUES
           (@Disponible
           ,@Tipo
           ,@Marca
           ,@Modelo
           ,@Descripcion
           ,@Precio
		   ,@Cantidad)
 end


 -- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================


USE [XtremeAutoNetCore]
GO

create procedure sp_AddCarroVendido

@CarroVendidoID int,
@RuedaID int,
@ColorID int,
@CarroModeloID int,
@SeguroID int,
@PrecioTotal decimal(18,2)

as 
begin

INSERT INTO [dbo].[CarroVendido]
           ([RuedaID]
           ,[ColorID]
           ,[CarroModeloID]
           ,[SeguroID]
           ,[PrecioTotal])
     VALUES
           (@RuedaID,
           @ColorID,
           @CarroModeloID,
           @SeguroID,
           @PrecioTotal)
end

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

USE [XtremeAutoNetCore]
GO

create procedure sp_AddColor

@ColorID int,
@Nombre nvarchar(30)

as
begin

INSERT INTO [dbo].[Color]
           ([Nombre])
     VALUES
            (@Nombre)
end

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

USE [XtremeAutoNetCore]
GO

create procedure sp_AddRueda

@RuedaID int,
@Nombre nvarchar(30),
@Precio  decimal(18,2)

as
begin

INSERT INTO [dbo].[Rueda]
           ([Nombre]
           ,[Precio])
     VALUES
           (@Nombre,
            @Precio)
end

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

USE [XtremeAutoNetCore]
GO

create procedure sp_AddSeguro

@SeguroID int,
@Nombre nvarchar(30),
@Plazo int,
@Precio  decimal(18,2)

as
begin

INSERT INTO [dbo].[Seguro]
           ([Nombre]
           ,[Plazo]
           ,[Precio])
     VALUES
           (@Nombre,
            @Plazo,
            @Precio)
end

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

USE [XtremeAutoNetCore]
GO

create procedure sp_AddTarjeta

@TarjetaID int,
@UsuarioID int,
@Nombre nvarchar(60),
@NumeroDeTarjeta nvarchar(30),
@CVV nvarchar(10),
@FechaVencimiento datetime

as 
begin


INSERT INTO [dbo].[Tarjeta]
           ([UsuarioID]
           ,[Nombre]
           ,[NumeroDeTarjeta]
           ,[CVV]
           ,[FechaVencimiento])
     VALUES
         
(@UsuarioID,
@Nombre,
@NumeroDeTarjeta,
@CVV,
@FechaVencimiento)

end

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

USE [XtremeAutoNetCore]
GO

create procedure sp_AddTransaccion

@TransaccionID int,
@VentaID int,
@TarjetaID int,
@FechaTransaccion datetime,
@FechaCorte datetime,
@InteresesMorosidad decimal(18,2),
@Pagado bit,
@Precio decimal(18,2)

as
begin

INSERT INTO [dbo].[Transaccion]
           ([VentaID]
           ,[TarjetaID]
           ,[FechaTransaccion]
           ,[FechaCorte]
           ,[InteresesMorosidad]
           ,[Pagado]
           ,[Precio])
     VALUES
           (@VentaID,
           @TarjetaID,
           @FechaTransaccion,
           @FechaCorte,
           @InteresesMorosidad,
           @Pagado,
           @Precio)
end

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

USE [XtremeAutoNetCore]
GO
create procedure sp_AddUsuario
           @UsuarioID int,
		   @Nombre nvarchar(50),
           @Apellido nvarchar(50),
           @Salario decimal(18,2),
           @Cedula nvarchar(15),
           @Email nvarchar(256),
           @PasswordHash nvarchar(max),
           @SecurityStamp nvarchar(max),
           @Telefono nvarchar(30),
           @Username nvarchar(50)
as
begin
INSERT INTO [dbo].[Usuario]
           ([Nombre]
           ,[Apellido]
           ,[Salario]
           ,[Cedula]
           ,[Email]
           ,[PasswordHash]
           ,[SecurityStamp]
           ,[Telefono]
           ,[Username])
     VALUES
           (@Nombre,
           @Apellido,
           @Salario,
           @Cedula,
           @Email,
           @PasswordHash,
           @SecurityStamp,
           @Telefono,
           @Username)

end

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================


USE [XtremeAutoNetCore]
GO
create procedure sp_AddVenta
           @VentaID int,
           @UsuarioID int,
           @CarroVendidoID int,
           @Total decimal(18,2),
           @Meses int,
           @Intereses decimal(18,2),
           @SaldoPendiente decimal(18,2),
           @SaldoAbonado decimal(18,2)
as 
begin

INSERT INTO [dbo].[Venta]
           ([UsuarioID]
           ,[CarroVendidoID]
           ,[Total]
           ,[Meses]
           ,[Intereses]
           ,[SaldoPendiente]
           ,[SaldoAbonado])
     VALUES
           (
           @UsuarioID,
           @CarroVendidoID,
           @Total,
           @Meses,
           @Intereses,
           @SaldoPendiente,
           @SaldoAbonado)
end













