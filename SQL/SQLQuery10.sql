/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1) [CarroVendidoID]
      ,[RuedaID]
      ,[ColorID]
      ,[CarroModeloID]
      ,[SeguroID]
      ,[PrecioTotal]
  FROM [XtremeAutoNetCore].[dbo].[CarroVendido]


ALTER TRIGGER trg_UpdateCantidad
ON CarroVendido
AFTER INSERT
AS
BEGIN
  UPDATE CarroModelo
  SET Cantidad = Cantidad - 1
  FROM CarroModelo
  INNER JOIN inserted ON CarroModelo.CarroModeloID = inserted.CarroModeloID;
END;