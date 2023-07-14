USE [XtremeAutoNetCore]
GO
/****** Object:  StoredProcedure [dbo].[sp_AddCarroVendido]    Script Date: 7/14/2023 2:23:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[sp_AddCarroVendido]
@RuedaID int,
@ColorID int,
@CarroModeloID int,
@SeguroID int

as 
begin
DECLARE
		@PrecioRueda decimal,
		@PrecioTotal decimal (18,2),
		@PrecioModelo decimal; 
		SET @PrecioRueda = (SELECT Precio from Rueda Where RuedaID = @RuedaID);
		SET @PrecioModelo = (SELECT Precio from CarroModelo Where CarroModeloID = @CarroModeloID);
		SET @PrecioTotal= @PrecioRueda + @PrecioModelo;

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
