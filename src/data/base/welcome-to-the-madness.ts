import DirectionType from "../core/direction_type";
import type GameMap from "../core/map";
import type BaseChunk from "./chunk";

export function map_set_up_chunk_linking(map: GameMap, chunks: BaseChunk[]) {
    map.set_connection(chunks[59].info, chunks[57].info, DirectionType.Up);
    map.set_connection(chunks[59].info, chunks[61].info, DirectionType.Down);
    map.set_connection(chunks[61].info, chunks[60].info, DirectionType.Left);
    map.set_connection(chunks[57].info, chunks[54].info, DirectionType.Up);
    map.set_connection(chunks[54].info, chunks[50].info, DirectionType.Up);
    map.set_connection(chunks[50].info, chunks[49].info, DirectionType.Left);
    map.set_connection(chunks[50].info, chunks[43].info, DirectionType.Up);
    map.set_connection(chunks[49].info, chunks[42].info, DirectionType.Up);
    map.set_connection(chunks[42].info, chunks[43].info, DirectionType.Right);
    map.set_connection(chunks[43].info, chunks[36].info, DirectionType.Up);
    map.set_connection(chunks[42].info, chunks[35].info, DirectionType.Up);
    map.set_connection(chunks[35].info, chunks[36].info, DirectionType.Right);
    map.set_connection(chunks[35].info, chunks[27].info, DirectionType.Up);
    map.set_connection(chunks[36].info, chunks[28].info, DirectionType.Up);
    map.set_connection(chunks[27].info, chunks[28].info, DirectionType.Right);
    map.set_connection(chunks[27].info, chunks[26].info, DirectionType.Left);
    map.set_connection(chunks[26].info, chunks[25].info, DirectionType.Left);
    map.set_connection(chunks[25].info, chunks[24].info, DirectionType.Left);
    map.set_connection(chunks[24].info, chunks[23].info, DirectionType.Left);
    map.set_connection(chunks[23].info, chunks[12].info, DirectionType.Up);
    map.set_connection(chunks[4].info, chunks[12].info, DirectionType.Down);
    map.set_connection(chunks[4].info, chunks[5].info, DirectionType.Right);
    map.set_connection(chunks[5].info, chunks[13].info, DirectionType.Down);
    map.set_connection(chunks[12].info, chunks[13].info, DirectionType.Right);
    map.set_connection(chunks[13].info, chunks[24].info, DirectionType.Down);
    map.set_connection(chunks[13].info, chunks[14].info, DirectionType.Right);
    map.set_connection(chunks[14].info, chunks[25].info, DirectionType.Down);
    map.set_connection(chunks[14].info, chunks[15].info, DirectionType.Right);
    map.set_connection(chunks[15].info, chunks[26].info, DirectionType.Down);
    map.set_connection(chunks[14].info, chunks[6].info, DirectionType.Up);
    map.set_connection(chunks[14].info, chunks[13].info, DirectionType.Left);
    map.set_connection(chunks[6].info, chunks[5].info, DirectionType.Left);
    map.set_connection(chunks[1].info, chunks[0].info, DirectionType.Left);
    map.set_connection(chunks[6].info, chunks[1].info, DirectionType.Up);
    map.set_connection(chunks[0].info, chunks[5].info, DirectionType.Down);
    map.set_connection(chunks[6].info, chunks[7].info, DirectionType.Right);
    map.set_connection(chunks[7].info, chunks[15].info, DirectionType.Down);
    map.set_connection(chunks[15].info, chunks[16].info, DirectionType.Right);
    map.set_connection(chunks[27].info, chunks[16].info, DirectionType.Up);
    map.set_connection(chunks[16].info, chunks[8].info, DirectionType.Up);
    map.set_connection(chunks[8].info, chunks[7].info, DirectionType.Left);
    map.set_connection(chunks[16].info, chunks[17].info, DirectionType.Right);
    map.set_connection(chunks[28].info, chunks[17].info, DirectionType.Up);
    map.set_connection(chunks[17].info, chunks[18].info, DirectionType.Right);
    map.set_connection(chunks[28].info, chunks[29].info, DirectionType.Right);
    map.set_connection(chunks[29].info, chunks[18].info, DirectionType.Up);
    map.set_connection(chunks[18].info, chunks[10].info, DirectionType.Up);
    map.set_connection(chunks[10].info, chunks[9].info, DirectionType.Left);
    map.set_connection(chunks[9].info, chunks[17].info, DirectionType.Down);
    map.set_connection(chunks[29].info, chunks[30].info, DirectionType.Right);
    map.set_connection(chunks[18].info, chunks[19].info, DirectionType.Right);
    map.set_connection(chunks[19].info, chunks[30].info, DirectionType.Down);
    map.set_connection(chunks[19].info, chunks[11].info, DirectionType.Up);
    map.set_connection(chunks[11].info, chunks[3].info, DirectionType.Up);
    map.set_connection(chunks[32].info, chunks[21].info, DirectionType.Up);
    map.set_connection(chunks[19].info, chunks[20].info, DirectionType.Right);
    map.set_connection(chunks[30].info, chunks[31].info, DirectionType.Right);
    map.set_connection(chunks[20].info, chunks[21].info, DirectionType.Right);
    map.set_connection(chunks[31].info, chunks[32].info, DirectionType.Right);
    map.set_connection(chunks[32].info, chunks[33].info, DirectionType.Right);
    map.set_connection(chunks[21].info, chunks[22].info, DirectionType.Right);
    map.set_connection(chunks[20].info, chunks[31].info, DirectionType.Down);
    map.set_connection(chunks[22].info, chunks[33].info, DirectionType.Down);
    map.set_connection(chunks[32].info, chunks[40].info, DirectionType.Down);
    map.set_connection(chunks[31].info, chunks[39].info, DirectionType.Down);
    map.set_connection(chunks[40].info, chunks[39].info, DirectionType.Left);
    map.set_connection(chunks[40].info, chunks[41].info, DirectionType.Right);
    map.set_connection(chunks[33].info, chunks[41].info, DirectionType.Down);
    map.set_connection(chunks[40].info, chunks[39].info, DirectionType.Left);
    map.set_connection(chunks[39].info, chunks[46].info, DirectionType.Down);
    map.set_connection(chunks[46].info, chunks[47].info, DirectionType.Right);
    map.set_connection(chunks[47].info, chunks[40].info, DirectionType.Up);
    map.set_connection(chunks[41].info, chunks[48].info, DirectionType.Down);
    map.set_connection(chunks[48].info, chunks[47].info, DirectionType.Left);
    map.set_connection(chunks[38].info, chunks[45].info, DirectionType.Down);
    map.set_connection(chunks[30].info, chunks[38].info, DirectionType.Down);
    map.set_connection(chunks[38].info, chunks[45].info, DirectionType.Down);
    map.set_connection(chunks[45].info, chunks[52].info, DirectionType.Down);
    map.set_connection(chunks[52].info, chunks[56].info, DirectionType.Down);
}

export function map_set_up_chunk_bricks(chunks: BaseChunk[]) {
    chunks[4].create_relative_entity(53, 273, 95, 153);

    // quầy cà phê
    // chunks[4].create_relative_entity(171, 134, 85, 101);
    chunks[4].create_relative_entity(0, 0, 93, 282);
    chunks[4].create_relative_entity(0, 0, 605, 65);
    chunks[4].create_relative_entity(218, 273, 95, 66);
    chunks[4].create_relative_entity(53, 434, 167, 230);

    chunks[12].create_relative_entity(0, 0, 95, 42);
    chunks[12].create_relative_entity(58, 0, 203, 98);
    chunks[12].create_relative_entity(154, 195, 191, 97);
    chunks[12].create_relative_entity(0, 273, 96, 138);
    chunks[12].create_relative_entity(150, 434, 172, 100);
    chunks[12].create_relative_entity(0, 434, 172, 153);

    chunks[13].create_relative_entity(151, 0, 606, 100);
    chunks[15].create_relative_entity(151, 0, 606, 100);
    chunks[17].create_relative_entity(151, 0, 606, 100);
    chunks[20].create_relative_entity(151, 0, 606, 100);
    chunks[21].create_relative_entity(151, 0, 606, 100);

    chunks[23].create_relative_entity(253, 0, 201, 1);
    chunks[23].create_relative_entity(159, 190, 413, 103);

    chunks[24].create_relative_entity(159, 0, 607, 1);
    chunks[25].create_relative_entity(159, 0, 607, 1);
    chunks[26].create_relative_entity(159, 0, 607, 1);
    chunks[29].create_relative_entity(159, 0, 607, 1);
    chunks[31].create_relative_entity(159, 0, 607, 1);

    // quầy lễ tân
    // chunks[59].create_relative_entity(34, 384, 82, 103);
}
