const { RESTDataSource } = require("apollo-datasource-rest");
const camelcaseKeys = require("camelcase-keys");

class ArenaDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.are.na/v2/";
  }

  /**
   ** Blocks
   */

  async getBlock({ id }) {
    const block = await this.get(`blocks/${id}`);
    return camelcaseKeys(block);
  }

  async getBlocks({ search, page = 1, size = 20 }) {
    const { blocks } = await this.get(
      `search/blocks?q=${search}&page=${page}&per=${size}`
    );
    return camelcaseKeys(blocks);
  }

  async getBlocksMeta({ search, page = 1, size = 20 }) {
    const { current_page, total_pages } = await this.get(
      `search/blocks?q=${search}&page=${page}&per=${size}`
    );
    return camelcaseKeys({ current_page, total_pages });
  }

  async getChannel({ slug, page = 1, size = 20 }) {
    const channel = await this.get(`channels/${slug}?page=${page}&per=${size}`);
    return camelcaseKeys(channel);
  }

  async getChannels({ search, page = 1, size = 20 }) {
    const url = search
      ? `search/channels?q=${search}&page=${page}&per=${size}`
      : `channels?page=${page}&per=${size}`;
    const { channels } = await this.get(url);
    return camelcaseKeys(channels);
  }

  async getChannelsMeta({ search, page = 1, size = 20 }) {
    const url = search
      ? `search/channels?q=${search}&page=${page}&per=${size}`
      : `channels?page=${page}&per=${size}`;
    const { current_page, total_pages } = await this.get(url);
    return camelcaseKeys({ current_page, total_pages });
  }

  /**
   ** Users
   */

  async getUser({ id }) {
    const user = await this.get(`users/${id}`);
    return camelcaseKeys(user);
  }

  async getUsers({ search, page = 1, size = 20 }) {
    const { users } = await this.get(
      `search/users?q=${search}&page=${page}&per=${size}`
    );
    return camelcaseKeys(users);
  }

  async getUsersMeta({ search, page = 1, size = 20 }) {
    const { current_page, total_pages } = await this.get(
      `search/users?q=${search}&page=${page}&per=${size}`
    );
    return camelcaseKeys({ current_page, total_pages });
  }
}

module.exports = { ArenaDataSource };
