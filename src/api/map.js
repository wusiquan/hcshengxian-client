const QQMap = require('../utils/qqmap.js')

/**
 * QQ地图解析类
 */
export default class Map {
  static API_KEY = 'PWOBZ-T3P3G-IQKQ4-IA4FN-SM3GV-56BXJ'
  // 徽长生鲜目前仅限马鞍山市
  static API_REGION = '北京市'

  /**
   * QQ地图API
   */
  static map = new QQMap({
    key: Map.API_KEY
  })

  /**
   * 地址检索
   * http://lbs.qq.com/webservice_v1/guide-search.html
   */
  static search(keyword, latitude, longitude, pageIndex) {
    return new Promise((resolve, reject) => {
      this.map.search({
        // boundary: `region(${this.API_REGION}, 0)`,
        // 似乎没什么用
        boundary: `nearby(${longitude}, ${latitude}, 1000)`,
        keyword: keyword,
        location: {
          latitude: latitude,
          longitude: longitude
        },
        address_format: 'short',
        page_size: 20,
        pageIndex: pageIndex,
        success: ({ data }) => {
          let result = []
          data.forEach(poi => {
            let address = this.processPOI(poi)
            result.push(address)
          })
          resolve(result)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  }

  /**
   * 地址逆解析
   */
  static reverse(latitude, longitude) {
    return new Promise((resolve, reject) => {
      this.map.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        get_poi: 1,
        poi_options: 'policy=2',
        success: ({ result }) => {
          const current = {};
          // 当前地址文本
          current.display = result.formatted_addresses.recommend;
          current.province = result.ad_info.province;
          current.city = result.ad_info.city;
          current.district = result.ad_info.district;
          current.town = result.address_reference.town.title;
          current.address = result.address;
          current.detail = result.address + current.display;
          current.latitude = result.location.lat;
          current.longitude = result.location.lng;
          // 附近的POI
          const nearby = [];
          const pois = result.pois;
          pois.forEach(poi => {
            const address = this.processPOI(poi);
            address.town = current.town;
            nearby.push(address);
          });
          resolve({current, nearby});
        },
        fail: function (res) {
          reject(res);
        }
      });
    });
  }

  /**
   * 处理POI数据
   */
  static processPOI (poi) {
    const address = {};
    address.id = poi.id
    address.display = poi.title
    address.province = poi.province || poi.ad_info && poi.ad_info.province || ''
    address.city = poi.city || poi.ad_info && poi.ad_info.city || ''
    address.district = poi.district || poi.ad_info && poi.ad_info.district || ''
    address.detail = poi.address + poi.title
    address.latitude = poi.location.lat
    address.longitude = poi.location.lng
    address.address = poi.address
    return address
  }

  /**
   * 搜索建议
   */
  static getSug(keyword) {
    return new Promise((resolve, reject) => {
      this.map.getSuggestion({
        keyword: keyword,
        region: this.API_REGION,
        region_fix: 1,
        policy: 1,
        success: ({ data }) => {
          let result = []
          data.forEach(poi => {
            let address = this.processPOI(poi)
            result.push(address)
          })
          resolve(result)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}
