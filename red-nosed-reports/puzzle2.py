import sys

def find_safe(report):
    if len(report) < 1:
        return True

    first = report[0]
    second = report[1]
    increasing = first < second

    for i in range(1, len(report)):
        diff = report[i] - report[i-1]

        if abs(diff) < 1 or abs(diff) > 3:
            return False, i

        if (increasing and diff < 0) or (not increasing and diff > 0):
            return False, i

    return True, None

if __name__ == "__main__":

    input_file = open(sys.argv[1], "r")
    reports = [list(map(int, line.split())) for line in input_file]
    
    safe_count = 0

    for report in reports:
        safe = True
        safe_level = True

        safe, unsafe_index = find_safe(report)
        # print("\t base: ", safe, "\t index: ", unsafe_index)

        if not safe:
            safe_level, _ = find_safe(report[:unsafe_index-1] + report[unsafe_index:])
            # print("\t level: ", safe_level)
            if not safe_level:
                continue

        if safe or safe_level:
            safe_count += 1
            continue

    print("Safe Reports: ", safe_count)

