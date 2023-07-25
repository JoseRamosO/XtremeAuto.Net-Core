using System;
using System.Collections.Generic;
using Entities.Utilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entities.Entities
{
    public partial class XtremeAutoNetCoreContext : DbContext
    {
        public XtremeAutoNetCoreContext()
        {
            var optionBuilder = new DbContextOptionsBuilder<XtremeAutoNetCoreContext>();
            optionBuilder.UseSqlServer(Util.ConnectionString);

        }

        public XtremeAutoNetCoreContext(DbContextOptions<XtremeAutoNetCoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CarroModelo> CarroModelos { get; set; } = null!;
        public virtual DbSet<CarroVendido> CarroVendidos { get; set; } = null!;
        public virtual DbSet<Color> Colors { get; set; } = null!;
        public virtual DbSet<Rol> Rols { get; set; } = null!;
        public virtual DbSet<Ruedum> Rueda { get; set; } = null!;
        public virtual DbSet<Seguro> Seguros { get; set; } = null!;
        public virtual DbSet<Tarjetum> Tarjeta { get; set; } = null!;
        public virtual DbSet<Transaccion> Transaccions { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;
        public virtual DbSet<Ventum> Venta { get; set; } = null!;
        public virtual DbSet<sp_GetAllCarroModelos_Result> sp_GetAllCarroModelos_Results { get; set; } = null!;
        public virtual DbSet<sp_GetAllCarroVendidos_Result> sp_GetAllCarroVendidos_Results { get; set; } = null!;
        public virtual DbSet<sp_GetAllColores_Result> sp_GetAllColores_Results { get; set; } = null!;
        public virtual DbSet<sp_GetAllRoles_Result> sp_GetAllRoles_Results { get; set; } = null!;
        public virtual DbSet<sp_GetAllRuedas_Result> sp_GetAllRuedas_Results { get; set; } = null!; 
        public virtual DbSet<sp_GetAllSeguros_Result> sp_GetAllSeguros_Results { get; set; } = null!;
        public virtual DbSet<sp_GetAllTarjetas_Result> sp_GetAllTarjetas_Results { get; set; } = null!;
        public virtual DbSet<sp_GetAllTransacciones_Result> sp_GetAllTransacciones_Results { get; set; } = null!;
        public virtual DbSet<sp_GetAllUsuarios_Result> sp_GetAllUsuarios_Results { get; set; } = null!;
        public virtual DbSet<sp_GetAllVentas_Result> sp_GetAllVentas_Results { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Util.ConnectionString);
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CarroModelo>(entity =>
            {
                entity.ToTable("CarroModelo");

                entity.Property(e => e.CarroModeloId).HasColumnName("CarroModeloID");

                entity.Property(e => e.Descripcion).HasMaxLength(4000);

                entity.Property(e => e.Imagen).HasColumnType("image");

                entity.Property(e => e.Marca).HasMaxLength(60);

                entity.Property(e => e.Modelo).HasMaxLength(100);

                entity.Property(e => e.Precio).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Tipo).HasMaxLength(30);
            });

            modelBuilder.Entity<CarroVendido>(entity =>
            {
                entity.ToTable("CarroVendido");

                entity.Property(e => e.CarroVendidoId).HasColumnName("CarroVendidoID");

                entity.Property(e => e.CarroModeloId).HasColumnName("CarroModeloID");

                entity.Property(e => e.ColorId).HasColumnName("ColorID");

                entity.Property(e => e.PrecioTotal).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.RuedaId).HasColumnName("RuedaID");

                entity.Property(e => e.SeguroId).HasColumnName("SeguroID");

                entity.HasOne(d => d.CarroModelo)
                    .WithMany(p => p.CarroVendidos)
                    .HasForeignKey(d => d.CarroModeloId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CarroVend__Carro__4222D4EF");

                entity.HasOne(d => d.Color)
                    .WithMany(p => p.CarroVendidos)
                    .HasForeignKey(d => d.ColorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CarroVend__Color__412EB0B6");

                entity.HasOne(d => d.Rueda)
                    .WithMany(p => p.CarroVendidos)
                    .HasForeignKey(d => d.RuedaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CarroVend__Rueda__403A8C7D");

                entity.HasOne(d => d.Seguro)
                    .WithMany(p => p.CarroVendidos)
                    .HasForeignKey(d => d.SeguroId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CarroVend__Segur__4316F928");
            });

            modelBuilder.Entity<Color>(entity =>
            {
                entity.ToTable("Color");

                entity.Property(e => e.ColorId).HasColumnName("ColorID");

                entity.Property(e => e.Imagen).HasColumnType("image");

                entity.Property(e => e.Nombre).HasMaxLength(30);
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.ToTable("Rol");

                entity.Property(e => e.RolId).HasColumnName("RolID");

                entity.Property(e => e.Nombre).HasMaxLength(30);
            });

            modelBuilder.Entity<Ruedum>(entity =>
            {
                entity.HasKey(e => e.RuedaId)
                    .HasName("PK__Rueda__7CFBF784C815919B");

                entity.Property(e => e.RuedaId).HasColumnName("RuedaID");

                entity.Property(e => e.Imagen).HasColumnType("image");

                entity.Property(e => e.Nombre).HasMaxLength(30);

                entity.Property(e => e.Precio).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<Seguro>(entity =>
            {
                entity.ToTable("Seguro");

                entity.Property(e => e.SeguroId).HasColumnName("SeguroID");

                entity.Property(e => e.Nombre).HasMaxLength(30);

                entity.Property(e => e.Precio).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<Tarjetum>(entity =>
            {
                entity.HasKey(e => e.TarjetaId)
                    .HasName("PK__Tarjeta__C82506965114A29B");

                entity.Property(e => e.TarjetaId).HasColumnName("TarjetaID");

                entity.Property(e => e.Cvv)
                    .HasMaxLength(10)
                    .HasColumnName("CVV");

                entity.Property(e => e.FechaVencimiento).HasColumnType("datetime");

                entity.Property(e => e.Nombre).HasMaxLength(60);

                entity.Property(e => e.NumeroDeTarjeta).HasMaxLength(30);

                entity.Property(e => e.UsuarioId).HasColumnName("UsuarioID");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.Tarjeta)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Tarjeta__Usuario__4CA06362");
            });

            modelBuilder.Entity<Transaccion>(entity =>
            {
                entity.ToTable("Transaccion");

                entity.Property(e => e.TransaccionId).HasColumnName("TransaccionID");

                entity.Property(e => e.FechaCorte).HasColumnType("datetime");

                entity.Property(e => e.FechaTransaccion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InteresesMorosidad).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Precio).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.TarjetaId).HasColumnName("TarjetaID");

                entity.Property(e => e.VentaId).HasColumnName("VentaID");

                entity.HasOne(d => d.Tarjeta)
                    .WithMany(p => p.Transaccions)
                    .HasForeignKey(d => d.TarjetaId)
                    .HasConstraintName("FK__Transacci__Tarje__5DCAEF64");

                entity.HasOne(d => d.Venta)
                    .WithMany(p => p.Transaccions)
                    .HasForeignKey(d => d.VentaId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Transacci__Venta__5EBF139D");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("Usuario");

                entity.Property(e => e.UsuarioId).HasColumnName("UsuarioID");

                entity.Property(e => e.Apellido).HasMaxLength(50);

                entity.Property(e => e.Cedula).HasMaxLength(15);

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.LockoutEndDateUtc).HasColumnType("datetime");

                entity.Property(e => e.Nombre).HasMaxLength(50);

                entity.Property(e => e.RolId).HasColumnName("RolID");

                entity.Property(e => e.Salario).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Telefono).HasMaxLength(30);

                entity.Property(e => e.Username).HasMaxLength(50);

                entity.HasOne(d => d.Rol)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.RolId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__RolID__45F365D3");
            });

            modelBuilder.Entity<Ventum>(entity =>
            {
                entity.HasKey(e => e.VentaId)
                    .HasName("PK__Venta__5B41514C2F6414C9");

                entity.Property(e => e.VentaId).HasColumnName("VentaID");

                entity.Property(e => e.CarroVendidoId).HasColumnName("CarroVendidoID");

                entity.Property(e => e.Intereses).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.SaldoAbonado).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.SaldoPendiente).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Total).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.UsuarioId).HasColumnName("UsuarioID");

                entity.HasOne(d => d.CarroVendido)
                    .WithMany(p => p.Venta)
                    .HasForeignKey(d => d.CarroVendidoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Venta__CarroVend__49C3F6B7");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.Venta)
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Venta__UsuarioID__48CFD27E");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
