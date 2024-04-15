﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OTTER.Data;

#nullable disable

namespace OTTER.Migrations
{
    [DbContext(typeof(OTTERDBContext))]
    [Migration("20240329214811_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.3");

            modelBuilder.Entity("OTTER.Models.Admin", b =>
                {
                    b.Property<int>("AdminID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("AdminID");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("OTTER.Models.Answer", b =>
                {
                    b.Property<int>("AnswerID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AnswerCoordinates")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("AnswerText")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("AnswerType")
                        .HasColumnType("INTEGER");

                    b.Property<string>("CorrectAnswer")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Feedback")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("AnswerID");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("OTTER.Models.Attempt", b =>
                {
                    b.Property<int>("AttemptID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("DateTime")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("QuizID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("AttemptID");

                    b.ToTable("Attempts");
                });

            modelBuilder.Entity("OTTER.Models.AttemptAnswer", b =>
                {
                    b.Property<int>("Question")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Answer")
                        .HasColumnType("INTEGER");

                    b.HasKey("Question");

                    b.ToTable("AttemptAnswers");
                });

            modelBuilder.Entity("OTTER.Models.AttemptQuestion", b =>
                {
                    b.Property<int>("AttemptQID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Attempt")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Question")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Sequence")
                        .HasColumnType("INTEGER");

                    b.HasKey("AttemptQID");

                    b.ToTable("AttemptQuestions");
                });

            modelBuilder.Entity("OTTER.Models.Certification", b =>
                {
                    b.Property<int>("CertificationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("DateTime")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ExpiryDateTime")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Module")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("CertificationID");

                    b.ToTable("Certifications");
                });

            modelBuilder.Entity("OTTER.Models.Module", b =>
                {
                    b.Property<int>("ModuleID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Sequence")
                        .HasColumnType("INTEGER");

                    b.HasKey("ModuleID");

                    b.ToTable("Modules");
                });

            modelBuilder.Entity("OTTER.Models.Organization", b =>
                {
                    b.Property<string>("OrganizationName")
                        .HasColumnType("TEXT");

                    b.HasKey("OrganizationName");

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("OTTER.Models.Question", b =>
                {
                    b.Property<int>("QuestionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageURL")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Module")
                        .HasColumnType("INTEGER");

                    b.Property<int>("QuestionType")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("QuestionID");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("OTTER.Models.Quiz", b =>
                {
                    b.Property<int>("QuizID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Module")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Sequence")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Stage")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("Visible")
                        .HasColumnType("INTEGER");

                    b.HasKey("QuizID");

                    b.ToTable("Quizzes");
                });

            modelBuilder.Entity("OTTER.Models.User", b =>
                {
                    b.Property<string>("UserEmail")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Organization")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("UserEmail");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
