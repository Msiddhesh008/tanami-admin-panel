import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Owner name is required"),
  password: Yup.string().required("Password is required"),
});

export const addCommunitySchema = Yup.object().shape({
  member_name: Yup.string().required("Name is required"),
  designation: Yup.string().required("Designation is required"),
  description: Yup.string().required("Description is required"),
  linkedin: Yup.string()
    .url("Invalid LinkedIn URL")
    .required("Linked In link is required"),
  profile_image: Yup.mixed()
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .optional(),
});

export const schemaEdit = Yup.object().shape({
  member_name: Yup.string().required("Name is required"),
  designation: Yup.string().required("Designation is required"),
  description: Yup.string().required("Description is required"),
  linkedin: Yup.string()
    .url("Invalid LinkedIn URL")
    .required("LinkedIn is required"),
});

export const addCommunityBannerSchema = Yup.object().shape({
  heading: Yup.string().required("Name is required"),
  sub_heading: Yup.string().required("Designation is required"),
  CTO_button_title: Yup.string().required("Description is required"),
  CTO_button_link: Yup.string()
    .url("Invalid LinkedIn URL")
    .required("LinkedIn is required"),
  banner_image: Yup.mixed()
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .optional(),
});

export const editCommunityBannerSchema = Yup.object().shape({
  heading: Yup.string().required("Name is required"),
  sub_heading: Yup.string().required("Designation is required"),
  CTO_button_title: Yup.string().required("Description is required"),
  CTO_button_link: Yup.string()
    .url("Invalid LinkedIn URL")
    .required("LinkedIn is required"),
});

export const addBlogSchema = Yup.object().shape({
  author_name: Yup.string().required("Author is required"),
  author_designation: Yup.string().required("Author designation is required"),
  title: Yup.string().required("Title is required"),
  meta_description: Yup.string().required("Description is required"),
  content: Yup.string(),
  summary: Yup.string().required("Summary is required"),
  profile_image: Yup.mixed()
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .test("file_formate", "Image file has unsupported format.", (files) => {
      // // // console.log(files[0].type)

      const SUPPORTED_FORMATS = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        // "image/gif",
        "image/tiff",
        "image/svg+xml",
      ];
      try {
        if (files.length !== 0) {
          return files && SUPPORTED_FORMATS.includes(files[0].type);
        }
        return true;
      } catch (error) {
        return false;
      }
    })
    .optional(),
  content_image_large: Yup.mixed()
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .optional(),
});

export const editBlogSchema = Yup.object().shape({
  author_name: Yup.string().required("Author is required"),
  author_designation: Yup.string().required("Author designation is required"),
  title: Yup.string().required("Title is required"),
  meta_description: Yup.string().required("Description is required"),
  content: Yup.string(),
  summary: Yup.string().required("Summary is required"),
  profile_image: Yup.mixed()
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .test("file_formate", "Image file has unsupported format.", (files) => {
      // // // console.log(files[0].type)

      const SUPPORTED_FORMATS = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        // "image/gif",
        "image/tiff",
        "image/svg+xml",
      ];
      try {
        if (files.length !== 0) {
          return files && SUPPORTED_FORMATS.includes(files[0].type);
        }
        return true;
      } catch (error) {
        return false;
      }
    })
    .optional(),
  content_image_large: Yup.mixed()
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .optional(),
});

export const addNews = Yup.object().shape({
  title: Yup.string().required("Author is required"),
  release_date: Yup.date().required("Release date is required"),
  meta_description: Yup.string().required("Description is required"),
  content: Yup.string().required("Content is required"),
  banner_image: Yup.mixed()
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    // .test("file_formate", "Image file has unsupported format.", (files) => {
    //   // // // console.log(files[0].type)

    //   const SUPPORTED_FORMATS = [
    //     "image/jpeg",
    //     "image/png",
    //     "image/gif",
    //     "image/tiff",
    //     "image/svg+xml",
    //   ];
    //   try {
    //     if (files.length !== 0) {
    //
    //       return files && SUPPORTED_FORMATS.includes(files[0].type);
    //     }
    //     return true;
    //   } catch (error) {
    //     return false;
    //   }
    // })
    .optional(),
});

export const editNews = Yup.object().shape({
  title: Yup.string(),
  release_date: Yup.date(),
  meta_description: Yup.string(),
  content: Yup.string(),
  banner_image: Yup.mixed()
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    // .test(
    //   "fileSize",
    //   " The maximum size of profile picture is 10MB.",
    //   (files) => {
    //     //if u want to allow only certain file sizes
    //     try {
    //       if (files.length !== 0) {
    //         return files[0].size <= 10000000;
    //       }
    //       return true;
    //     } catch (error) {
    //       return false;
    //     }
    //   }
    // )
    // .test("file_formate", "Image file has unsupported format.", (files) => {
    //   // // // console.log(files[0].type)

    //   const SUPPORTED_FORMATS = [
    //     "image/jpeg",
    //     "image/png",
    //     "image/gif",
    //     "image/tiff",
    //     "image/svg+xml",
    //   ];
    //   try {
    //     if (files.length !== 0) {
    //
    //       return files && SUPPORTED_FORMATS.includes(files[0].type);
    //     }
    //     return true;
    //   } catch (error) {
    //     return false;
    //   }
    // })
    .optional(),
});

export const addEvents = Yup.object().shape({
  title: Yup.string().required("title is required"),
  content: Yup.string().required("content is required"),
  location: Yup.string().required("location is required"),
  organizer_name: Yup.string().required("Org name date is required"),
  eventDates: Yup.string(),
  organizer_mobile_number: Yup.string()
    .required("Org contact is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  organizer_email: Yup.string()
    .required("Org email is required")
    .email("Please enter valid email"),
  banner_image: Yup.mixed()
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    // .test(
    //   "fileSize",
    //   " The maximum size of profile picture is 10MB.",
    //   (files) => {
    //     //if u want to allow only certain file sizes
    //     try {
    //       if (files.length !== 0) {
    //         return files[0].size <= 10000000;
    //       }
    //       return true;
    //     } catch (error) {
    //       return false;
    //     }
    //   }
    // )
    // .test("file_formate", "Image file has unsupported format.", (files) => {
    //   // // // console.log(files[0].type)

    //   const SUPPORTED_FORMATS = [
    //     "image/jpeg",
    //     "image/png",
    //     "image/gif",
    //     "image/tiff",
    //     "image/svg+xml",
    //   ];
    //   try {
    //     if (files.length !== 0) {
    //
    //       return files && SUPPORTED_FORMATS.includes(files[0].type);
    //     }
    //     return true;
    //   } catch (error) {
    //     return false;
    //   }
    // })
    .optional(),
});

export const addWhitePapers = Yup.object().shape({
  title: Yup.string().required("title is required"),
  image: Yup.mixed()
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    // .test("file_formate", "Image file has unsupported format.", (files) => {
    //   // // // console.log(files[0].type)

    //   const SUPPORTED_FORMATS = [
    //     "image/jpeg",
    //     "image/jpg",
    //     "image/png",
    //     "image/gif",
    //     "image/tiff",
    //     "image/svg+xml",
    //   ];
    //   try {
    //     if (files.length !== 0) {
    //
    //       return files && SUPPORTED_FORMATS.includes(files[0].type);
    //     }
    //     return true;
    //   } catch (error) {
    //     return false;
    //   }
    // })
    .optional(),
  document: Yup.mixed()
    // .test("required", "You need to provide a file", (files) => {
    //   // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
    //   if (files) return true;
    //   return false;
    // })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .optional(),
  // .test("file_formate", "Image file has unsupported format.", (files) => {
  //   // // // console.log(files[0].type)

  //   const SUPPORTED_FORMATS = [
  //     "image/jpeg",
  //     "image/png",
  //     "image/jpg",
  //     "image/gif",
  //     "image/tiff",
  //     "image/svg+xml",
  //   ];
  //   try {
  //     if (files.length !== 0) {
  //
  //       return files && SUPPORTED_FORMATS.includes(files[0].type);
  //     }
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // })
});

// test("fileSize", "Image must be at least 10MB", (value) => {
//   if (!value) return true;
//   const fileSizeInBytes = value.size;
//   const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
//   return fileSizeInMB >= 10;
// })

export const addVideos = Yup.object().shape({
  title: Yup.string().required("Name is required"),
  thumbnail: Yup.mixed()
    .required("Thumbnail is required")
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    ),
  description: Yup.string().required("Description is required"),
  duration: Yup.string().required("LinkedIn is required"),
  embeddedCode: Yup.string().required("LinkedIn is required"),
});

export const addUsecase = Yup.object().shape({
  title: Yup.string().required("Name is required"),
  meta_description: Yup.string().required("Description is required"),
  attachment: Yup.mixed(),
  content: Yup.string(),
  banner_image: Yup.mixed()
    // .required("Thumbnail is required")
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .optional(),
  icon: Yup.mixed()
    // .required("Icon is required")
    .test("required", "You need to provide a file", (files) => {
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .optional(),
});

export const editUsecase = Yup.object().shape({
  title: Yup.string().required("Name is required"),
  meta_description: Yup.string().required("Description is required"),
  attachment: Yup.mixed(),
  content: Yup.string(),
  banner_image: Yup.mixed()
    // .required("Thumbnail is required")
    .test("required", "You need to provide a file", (files) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        //if u want to allow only certain file sizes
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .optional(),
  icon: Yup.mixed()
    // .required("Icon is required")
    .test("required", "You need to provide a file", (files) => {
      if (files) return true;
      return false;
    })
    .test(
      "fileSize",
      " The maximum size of profile picture is 10MB.",
      (files) => {
        try {
          if (files.length !== 0) {
            return files[0].size <= 10000000;
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    )
    .optional(),
});

export const addTerms = Yup.object().shape({
  title: Yup.string().required("title is required"),
  content: Yup.string(),
  banner_image: Yup.mixed()
    // .test("required", "You need to provide a file", (files) => {
    //   // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
    //   if (files) return true;
    //   return false;
    // })
    // .test(
    //   "fileSize",
    //   " The maximum size of profile picture is 10MB.",
    //   (files) => {
    //     //if u want to allow only certain file sizes
    //     try {
    //       if (files.length !== 0) {
    //         return files[0].size <= 10000000;
    //       }
    //       return true;
    //     } catch (error) {
    //       return false;
    //     }
    //   }
    // )
    .optional(),
  // .test("file_formate", "Image file has unsupported format.", (files) => {
  //   // // // console.log(files[0].type)

  //   const SUPPORTED_FORMATS = [
  //     "image/jpeg",
  //     "image/png",
  //     "image/jpg",
  //     "image/gif",
  //     "image/tiff",
  //     "image/svg+xml",
  //   ];
  //   try {
  //     if (files.length !== 0) {
  //
  //       return files && SUPPORTED_FORMATS.includes(files[0].type);
  //     }
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // })
});

export const addPolicy = Yup.object().shape({
  title: Yup.string().required("title is required"),
  content: Yup.string(),
  banner_image: Yup.mixed()
    // .test("required", "You need to provide a file", (files) => {
    //   // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
    //   if (files) return true;
    //   return false;
    // })
    // .test(
    //   "fileSize",
    //   " The maximum size of profile picture is 10MB.",
    //   (files) => {
    //     //if u want to allow only certain file sizes
    //     try {
    //       if (files.length !== 0) {
    //         return files[0].size <= 10000000;
    //       }
    //       return true;
    //     } catch (error) {
    //       return false;
    //     }
    //   }
    // )
    .optional(),
  // .test("file_formate", "Image file has unsupported format.", (files) => {
  //   // // // console.log(files[0].type)

  //   const SUPPORTED_FORMATS = [
  //     "image/jpeg",
  //     "image/png",
  //     "image/jpg",
  //     "image/gif",
  //     "image/tiff",
  //     "image/svg+xml",
  //   ];
  //   try {
  //     if (files.length !== 0) {
  //
  //       return files && SUPPORTED_FORMATS.includes(files[0].type);
  //     }
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // })
});

export const addPartnerCard = Yup.object().shape({
  website_link: Yup.string().required("link is required"),
  description: Yup.string().required("description is required"),
  banner_image: Yup.mixed()
    .required("logo is required")
    // .test("required", "You need to provide a file", (files) => {
    //   // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
    //   if (files) return true;
    //   return false;
    // })
    // .test(
    //   "fileSize",
    //   " The maximum size of profile picture is 10MB.",
    //   (files) => {
    //     //if u want to allow only certain file sizes
    //     try {
    //       if (files.length !== 0) {
    //         return files[0].size <= 10000000;
    //       }
    //       return true;
    //     } catch (error) {
    //       return false;
    //     }
    //   }
    // )
    .optional(),
  // .test("file_formate", "Image file has unsupported format.", (files) => {
  //   // // // console.log(files[0].type)

  //   const SUPPORTED_FORMATS = [
  //     "image/jpeg",
  //     "image/png",
  //     "image/jpg",
  //     "image/gif",
  //     "image/tiff",
  //     "image/svg+xml",
  //   ];
  //   try {
  //     if (files.length !== 0) {
  //
  //       return files && SUPPORTED_FORMATS.includes(files[0].type);
  //     }
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // })
});

export const addFaq = Yup.object().shape({
  question: Yup.string().required("Qustion is required"),
  answer: Yup.string()
    // banner_image: Yup.mixed()
    // .test("required", "You need to provide a file", (files) => {
    //   // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
    //   if (files) return true;
    //   return false;
    // })
    // .test(
    //   "fileSize",
    //   " The maximum size of profile picture is 10MB.",
    //   (files) => {
    //     //if u want to allow only certain file sizes
    //     try {
    //       if (files.length !== 0) {
    //         return files[0].size <= 10000000;
    //       }
    //       return true;
    //     } catch (error) {
    //       return false;
    //     }
    //   }
    // )
    .optional(),
  // .test("file_formate", "Image file has unsupported format.", (files) => {
  //   // // // console.log(files[0].type)

  //   const SUPPORTED_FORMATS = [
  //     "image/jpeg",
  //     "image/png",
  //     "image/jpg",
  //     "image/gif",
  //     "image/tiff",
  //     "image/svg+xml",
  //   ];
  //   try {
  //     if (files.length !== 0) {
  //
  //       return files && SUPPORTED_FORMATS.includes(files[0].type);
  //     }
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // })
});
