﻿using System.ComponentModel.DataAnnotations;

namespace OTTER.Dtos
{
    public class EditQuestionInputDto
    {
        [Required]
        public int QuestionID { get; set; }
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }
        [Required]
        public int Topic { get; set; }
        [Required]
        public IEnumerable<EditAnswerInputDto> Answers { get; set; }
    }
}
