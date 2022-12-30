using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Professor> Professors { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<ClassProfessor> ClassProfessors { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ClassProfessor>(x => x.HasKey(cp => new {cp.ClassId, cp.ProfessorId}));//this will form primary key of ClassProfessor table

            builder.Entity<ClassProfessor>()
                .HasOne(c => c.Class)
                .WithMany(p => p.Professors)
                .HasForeignKey(cc => cc.ClassId);

            builder.Entity<ClassProfessor>()
                .HasOne(c => c.Professor)
                .WithMany(p => p.Classes)
                .HasForeignKey(cc => cc.ProfessorId);
        }
    }
}