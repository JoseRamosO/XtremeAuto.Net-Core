create database XtremeAutoNetCore;
use XtremeAutoNetCore;
create table Rol
(RolID int not null identity,
Nombre nvarchar (30) not null,
primary key(RolID)
)

create table Rueda
(RuedaID int not null identity,
Nombre nvarchar (30) not null,
Imagen image not null,
Precio decimal (18,2) not null,
primary key(RuedaID)
)

create table Color
(ColorID int not null identity,
Nombre nvarchar (30) not null,
Imagen image not null,
primary key(ColorID)
)

create table Seguro
(SeguroID int not null identity,
Nombre nvarchar (30) not null,
Plazo int not null,
Precio decimal (18,2) not null,
primary key(SeguroID)
)
create table CarroModelo
(CarroModeloID int not null identity,
Disponible bit not null,
Tipo nvarchar (30) not null,
Marca nvarchar (60) not null,
Modelo nvarchar (100) not null,
Descripcion nvarchar (4000) not null,
Precio decimal (18,2) not null,
Imagen image not null,
Cantidad int not null,
primary key(CarroModeloID)
)

create table CarroVendido
(CarroVendidoID int not null identity,
RuedaID int not null,
ColorID int not null,
CarroModeloID int not null,
SeguroID int not null,
PrecioTotal decimal (18,2) not null,
primary key(CarroVendidoID),
foreign key(RuedaID) references Rueda(RuedaID),
foreign key(ColorID) references Color(ColorID),
foreign key(CarroModeloID) references CarroModelo(CarroModeloID),
foreign key(SeguroID) references Seguro(SeguroID)
)

create table Usuario
(UsuarioID int not null identity,
Nombre nvarchar(50) not null,
Apellido nvarchar(50) not null,
Salario decimal (18,2) not null,
Cedula nvarchar(15) not null,
Email nvarchar(256) not null,
PasswordHash nvarchar(max) not null,
SecurityStamp nvarchar(max) not null,
Telefono nvarchar(30) not null,
Username nvarchar(50) not null,
RolID int not null,
LockoutEnabled bit not null,
FailedAttemptsCount int not null,
LockoutEndDateUtc datetime not null,
primary key(UsuarioID),
foreign key(RolID) references Rol(RolID)
)

create table Venta
(VentaID int not null identity,
UsuarioID int not null,
CarroVendidoID int not null,
Total decimal (18,2) not null,
Meses int not null,
Intereses decimal (18,2) not null,
SaldoPendiente decimal (18,2) not null,
SaldoAbonado decimal (18,2) not null,
primary key(VentaID),
foreign key(UsuarioID) references Usuario(UsuarioID),
foreign key(CarroVendidoID) references CarroVendido(CarroVendidoID)
)

create table Tarjeta
(TarjetaID int not null identity,
UsuarioID int not null,
Nombre nvarchar (60) not null,
NumeroDeTarjeta nvarchar (30) not null,
CVV nvarchar(10) not null,
FechaVencimiento datetime not null,
primary key(TarjetaID),
foreign key(UsuarioID) references Usuario(UsuarioID)
)

create table Transaccion
(TransaccionID int not null identity,
VentaID int not null,
TarjetaID int null,
FechaTransaccion datetime null default (GETDATE()),
FechaCorte datetime not null,
InteresesMorosidad decimal (18,2) not null,
Pagado bit not null,
Precio decimal (18,2) not null
primary key(TransaccionID),
foreign key(TarjetaID) references Tarjeta(TarjetaID),
foreign key(VentaID) references Venta(VentaID)
)