﻿using System.ComponentModel.DataAnnotations;
using OTTER.Models;

namespace OTTER.Dtos
{
    public class AdminQuestionOutputDto
    {
        [Required]
        public int QuestionID { get; set; }
        [Required]
        public int ModID { get; set; }
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? ImageURL { get; set; }
        [Required]
        public int QuestionType { get; set; }
        [Required]
        public int Topic { get; set; }
        [Required]
        public List<AdminAnswerOutputDto> Answers { get; set; }
        [Required]
        public int attemptTotal { get; set; }
        [Required]
        public int correctTotal { get; set; }
        [Required]
        public double correctRate { get; set; }
    }
}
