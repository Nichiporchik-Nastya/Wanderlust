// const { where, Op } = require("sequelize");

const { fn, col } = require("sequelize");


const Orders = require("../db/models/index").Orders;
const Excursions = require("../db/models/index").Excursions;
const Types = require("../db/models/index").Types;
// const Formats = require("../db/models/index").Formats;
// const Types = require("../db/models/index").Types;
// const Themes = require("../db/models/index").Themes;
// const DaysExcursions = require("../db/models/index").DaysExcursions;
// const StartTimes = require("../db/models/index").StartTimes;
// const ThemeExcursions = require("../db/models/index").ThemeExcursions;
// const ImagesExcursions = require("../db/models/index").ImagesExcursions;


class OrderModel {
    async create(body) {
        try {
            return await Orders.create(body);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // async countOrdersByUserId(userId) {
    //     const count = await Orders.count({
    //       include: [{
    //         model: Excursions,
    //         where: { userId: userId }
    //       }]
    //     });

    //     return count;
    //   }

    async  countOrdersByGuideId(guideId) {
        const excursions = await Excursions.findAll({
            where: { guideId: guideId }
          });
        
          const result = [];
          for (const excursion of excursions) {
            const count = await Orders.count({
              where: { excursionId: excursion.id }
            });
        
            result.push({
              excursionId: excursion.id,
              bookingCount: count
            });
          }
        
          return result;
      }

    async getFreePlaces(excursionId, day) {
        let excursion = await Excursions.findOne({
            where: { id: excursionId },
            include: [
                {
                    model: Types,
                    as: 'type'
                },
            ],
        })
        let orders = await Orders.findOne({
            where: {
                excursionId,
                day
            },
            attributes: [
                'excursionId',
                [fn('sum', col('numberOfChildren')), 'total_children'],
                [fn('sum', col('numberOfAdults')), 'total_adults'],
            ],
            group: ['excursionId'],
        });
        return excursion.type.clientMaxNumber - (+orders?.dataValues?.total_children || 0) - (+orders?.dataValues?.total_adults || 0);
    }

    async get(id) {
        return await Orders.findOne({
            where: {
                id
            }
        });
    }
}

module.exports = new OrderModel();
