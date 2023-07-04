using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Models.DatabaseModels;
using ocrent;

namespace Dal.ApplicationStorage;

public partial class ApiContext : DbContext
{
    IConfiguration configuration;
    public ApiContext(DbContextOptions<ApiContext> options, IConfiguration configuration)
        : base(options)
    {
        this.configuration = configuration;
    }

    public virtual DbSet<Administrator> Administrators { get; set; }

    public virtual DbSet<BusinessUser> BusinessUsers { get; set; }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Contract> Contracts { get; set; }

    public virtual DbSet<DeliveryMan> DeliveryMen { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Model> Models { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<PaymentCard> PaymentCards { get; set; }

    public virtual DbSet<Registration> Registrations { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Vehicle> Vehicles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(configuration.GetConnectionString("ApiDatabase"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Administrator>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("administrators_pkey");

            entity.ToTable("administrators", "project");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("user_id");

            entity.HasOne(d => d.User).WithOne(p => p.Administrator)
                .HasForeignKey<Administrator>(d => d.UserId)
                .HasConstraintName("administrators_user_id_fkey");
        });

        modelBuilder.Entity<BusinessUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("business_users_pkey");

            entity.ToTable("business_users", "project");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("user_id");

            entity.HasOne(d => d.User).WithOne(p => p.BusinessUser)
                .HasForeignKey<BusinessUser>(d => d.UserId)
                .HasConstraintName("business_users_user_id_fkey");
        });

        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("clients_pkey");

            entity.ToTable("clients", "project");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("user_id");

            entity.HasOne(d => d.User).WithOne(p => p.Client)
                .HasForeignKey<Client>(d => d.UserId)
                .HasConstraintName("clients_user_id_fkey");
        });

        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.CompanyId).HasName("companies_pkey");

            entity.ToTable("companies", "project");

            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.AdministratorId).HasColumnName("administrator_id");
            entity.Property(e => e.BusinessUserId).HasColumnName("business_user_id");
            entity.Property(e => e.CompanyEmail)
                .HasMaxLength(256)
                .HasColumnName("company_email");
            entity.Property(e => e.CompanyName)
                .HasMaxLength(256)
                .HasColumnName("company_name");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.CreatedOn).HasColumnName("created_on");
            entity.Property(e => e.ModifiedBy).HasColumnName("modified_by");
            entity.Property(e => e.ModifiedOn).HasColumnName("modified_on");

            entity.HasOne(d => d.Administrator).WithMany(p => p.Companies)
                .HasForeignKey(d => d.AdministratorId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("companies_administrator_id_fkey");

            entity.HasOne(d => d.BusinessUser).WithMany(p => p.Companies)
                .HasForeignKey(d => d.BusinessUserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("companies_business_user_id_fkey");
        });

        modelBuilder.Entity<Contract>(entity =>
        {
            entity.HasKey(e => new { e.SignedDate, e.UserId, e.VehicleId, e.DeliveryManId }).HasName("pk_contract");

            entity.ToTable("contracts", "project");

            entity.Property(e => e.SignedDate).HasColumnName("signed_date");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.VehicleId).HasColumnName("vehicle_id");
            entity.Property(e => e.DeliveryManId).HasColumnName("delivery_man_id");
            entity.Property(e => e.Address)
                .HasMaxLength(50)
                .HasColumnName("address");
            entity.Property(e => e.CardId).HasColumnName("card_id");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.Hasbabyseat)
                .HasDefaultValueSql("false")
                .HasColumnName("hasbabyseat");
            entity.Property(e => e.Hasgreencard)
                .HasDefaultValueSql("false")
                .HasColumnName("hasgreencard");
            entity.Property(e => e.Hasnavigation)
                .HasDefaultValueSql("false")
                .HasColumnName("hasnavigation");
            entity.Property(e => e.Hasroofrack)
                .HasDefaultValueSql("false")
                .HasColumnName("hasroofrack");
            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.Review)
                .HasMaxLength(500)
                .HasColumnName("review");
            entity.Property(e => e.StartDate).HasColumnName("start_date");

            entity.HasOne(d => d.DeliveryMan).WithMany(p => p.Contracts)
                .HasForeignKey(d => d.DeliveryManId)
                .HasConstraintName("contracts_delivery_man_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Contracts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("contracts_user_id_fkey");

            entity.HasOne(d => d.Vehicle).WithMany(p => p.Contracts)
                .HasForeignKey(d => d.VehicleId)
                .HasConstraintName("contracts_vehicle_id_fkey");

            entity.HasOne(d => d.Payment).WithMany(p => p.Contracts)
                .HasForeignKey(d => new { d.PaymentId, d.CardId })
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_contract_payment");
        });

        modelBuilder.Entity<DeliveryMan>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("delivery_man_pkey");

            entity.ToTable("delivery_man", "project");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("user_id");
            entity.Property(e => e.BusinessUserId).HasColumnName("business_user_id");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.DateOfEmployment).HasColumnName("date_of_employment");
            entity.Property(e => e.Salary).HasColumnName("salary");

            entity.HasOne(d => d.BusinessUser).WithMany(p => p.DeliveryManBusinessUsers)
                .HasForeignKey(d => d.BusinessUserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("delivery_man_business_user_id_fkey");

            entity.HasOne(d => d.Company).WithMany(p => p.DeliveryMen)
                .HasForeignKey(d => d.CompanyId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("delivery_man_company_id_fkey");

            entity.HasOne(d => d.User).WithOne(p => p.DeliveryManUser)
                .HasForeignKey<DeliveryMan>(d => d.UserId)
                .HasConstraintName("delivery_man_user_id_fkey");

            entity.HasMany(d => d.Vehicles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "IsResponsibleFor",
                    r => r.HasOne<Vehicle>().WithMany()
                        .HasForeignKey("VehicleId")
                        .HasConstraintName("is_responsible_for_vehicle_id_fkey"),
                    l => l.HasOne<DeliveryMan>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("is_responsible_for_user_id_fkey"),
                    j =>
                    {
                        j.HasKey("UserId", "VehicleId").HasName("pk_is_responsible_for");
                        j.ToTable("is_responsible_for", "project");
                    });
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => new { e.LocationId, e.CompanyId }).HasName("pk_locations");

            entity.ToTable("locations", "project");

            entity.Property(e => e.LocationId)
                .ValueGeneratedOnAdd()
                .HasColumnName("location_id");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .HasColumnName("city");
            entity.Property(e => e.Street)
                .HasMaxLength(100)
                .HasColumnName("street");
            entity.Property(e => e.StreetNumber).HasColumnName("street_number");

            entity.HasOne(d => d.Company).WithMany(p => p.Locations)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("locations_company_id_fkey");
        });

        modelBuilder.Entity<Model>(entity =>
        {
            entity.HasKey(e => e.ModelId).HasName("models_pkey");

            entity.ToTable("models", "project");

            entity.Property(e => e.ModelId).HasColumnName("model_id");
            entity.Property(e => e.Color)
                .HasMaxLength(30)
                .HasColumnName("color");
            entity.Property(e => e.Fuel)
                .HasMaxLength(30)
                .HasColumnName("fuel");
            entity.Property(e => e.ModelName)
                .HasMaxLength(100)
                .HasColumnName("model_name");
            entity.Property(e => e.ModelYear).HasColumnName("model_year");
            entity.Property(e => e.NumOfDoors).HasColumnName("num_of_doors");
            entity.Property(e => e.NumOfSeats).HasColumnName("num_of_seats");
            entity.Property(e => e.Transmission)
                .HasMaxLength(10)
                .HasColumnName("transmission");
            entity.Property(e => e.VehicleType)
                .HasMaxLength(30)
                .HasColumnName("vehicle_type");
            entity.Property(e => e.ImgUrl).HasColumnName("img_url");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => new { e.PaymentId, e.CardId }).HasName("pk_payment");

            entity.ToTable("payments", "project");

            entity.HasIndex(e => e.PaymentId, "payments_payment_id_key").IsUnique();

            entity.Property(e => e.PaymentId)
                .ValueGeneratedOnAdd()
                .HasColumnName("payment_id");
            entity.Property(e => e.CardId).HasColumnName("card_id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.PaymentDate).HasColumnName("payment_date");
            entity.Property(e => e.PaymentTime).HasColumnName("payment_time");

            entity.HasOne(d => d.Card).WithMany(p => p.Payments)
                .HasForeignKey(d => d.CardId)
                .HasConstraintName("payments_card_id_fkey");
        });

        modelBuilder.Entity<PaymentCard>(entity =>
        {
            entity.HasKey(e => e.CardId).HasName("payment_cards_pkey");

            entity.ToTable("payment_cards", "project");

            entity.Property(e => e.CardId).HasColumnName("card_id");
            entity.Property(e => e.CardNumber)
                .HasMaxLength(16)
                .HasColumnName("card_number");
            entity.Property(e => e.Cvc).HasColumnName("cvc");
            entity.Property(e => e.HolderName)
                .HasMaxLength(100)
                .HasColumnName("holder_name");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.ValidThru).HasColumnName("valid_thru");

            entity.HasOne(d => d.User).WithMany(p => p.PaymentCards)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("payment_cards_user_id_fkey");
        });

        modelBuilder.Entity<Registration>(entity =>
        {
            entity.HasKey(e => e.RegistrationId).HasName("registrations_pkey");

            entity.ToTable("registrations", "project");

            entity.Property(e => e.RegistrationId).HasColumnName("registration_id");
            entity.Property(e => e.IsAvailable).HasColumnName("is_available");
            entity.Property(e => e.PlateNum)
                .HasMaxLength(8)
                .HasColumnName("plate_num");
            entity.Property(e => e.RegistredOn).HasColumnName("registred_on");
            entity.Property(e => e.ValidThru).HasColumnName("valid_thru");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("users_pkey");

            entity.ToTable("users", "project");

            entity.HasIndex(e => e.Email, "users_email_key").IsUnique();

            entity.HasIndex(e => e.Username, "users_username_key").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.CreatedOn).HasColumnName("created_on");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("last_name");
            entity.Property(e => e.ModifiedOn).HasColumnName("modified_on");
            entity.Property(e => e.Pass)
                .HasMaxLength(255)
                .HasColumnName("pass");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasKey(e => e.VehicleId).HasName("vehicles_pkey");

            entity.ToTable("vehicles", "project");

            entity.Property(e => e.VehicleId).HasColumnName("vehicle_id");
            entity.Property(e => e.Brand)
                .HasMaxLength(50)
                .HasColumnName("brand");
            entity.Property(e => e.ChassisNumber)
                .HasMaxLength(17)
                .HasColumnName("chassis_number");
            entity.Property(e => e.CompanyId).HasColumnName("company_id");
            entity.Property(e => e.DailyRentalPrice).HasColumnName("daily_rental_price");
            entity.Property(e => e.FuelEfficiency)
                .HasMaxLength(15)
                .HasColumnName("fuel_efficiency");
            entity.Property(e => e.LocationId).HasColumnName("location_id");
            entity.Property(e => e.ModelId).HasColumnName("model_id");
            entity.Property(e => e.RegistrationId).HasColumnName("registration_id");
            entity.Property(e => e.VehicleType)
                .HasMaxLength(30)
                .HasColumnName("vehicle_type");

            entity.HasOne(d => d.Model).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.ModelId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("vehicles_model_id_fkey");

            entity.HasOne(d => d.Registration).WithMany(p => p.Vehicles)
                .HasForeignKey(d => d.RegistrationId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("vehicles_registration_id_fkey");

            entity.HasOne(d => d.Location).WithMany(p => p.Vehicles)
                .HasForeignKey(d => new { d.LocationId, d.CompanyId })
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_location");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
