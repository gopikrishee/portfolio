/**
 * Model representing a Blog post
 */
class BlogPost {
  /**
   * @param {Object} data - Raw data from API
   */
  constructor(data = {}) {
    this.id = data.id;
    this.userId = data.userId;
    this.userName = data.userName;
    this.title = data.title;
    this.slug = data.slug;
    this.excerpt = data.excerpt;
    this.coverImageUrl = data.coverImageUrl || "";
    this.status = data.status;
    this.tags = data.tags || [];
    this.viewCount = data.viewCount || 0;
    this.publishedAt = data.publishedAt ? new Date(data.publishedAt) : null;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
    this.author = data.author;
  }

  /**
   * Create an array of BlogPosts from API array
   * @static
   * @param {Array} dataArray
   * @returns {Array<BlogPost>}
   */
  static fromJSONArray(dataArray) {
    return (dataArray || []).map((item) => new BlogPost(item));
  }
}

export default BlogPost;
